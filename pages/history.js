import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Container, ListGroup, Button } from "react-bootstrap";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";


export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {

    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  if (!searchHistory) {
    return null;
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 className="fw-bold mb-1">Search History</h2>
          <p className="text-muted mb-0">
            Quickly revisit your recent artwork searches.
          </p>
        </div>

        {parsedHistory?.length > 0 && (
          <span className="badge bg-secondary">
            {parsedHistory.length} searches
          </span>
        )}
      </div>

      <hr className="mb-4" />

      {/* History List */}
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              action
              className={`d-flex align-items-center justify-content-between ${styles.historyListItem}`}
              onClick={(e) => historyClicked(e, index)}
            >
              {/* Left side: query */}
              <div className="me-3">
                {Object.keys(historyItem).map((key) => (
                  <span key={key} className="me-2">
                    <span className="text-muted">{key}:</span>{" "}
                    <strong>{historyItem[key]}</strong>
                  </span>
                ))}
              </div>

              {/* Right side: delete */}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="text-center py-5">
          <h4 className="mb-2">No search history yet</h4>
          <p className="text-muted mb-3">
            Start exploring the MET to build your history.
          </p>
          <Button variant="primary" href="/search">
            Start Searching
          </Button>
        </div>
      )}
    </Container>
  );
}