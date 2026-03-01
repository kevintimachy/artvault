import { Image, Container, Button, Nav } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import BlurText from '@/components/BlurText';


export default function Home() {
  const router = useRouter();


  return (
    <>
      {/* Hero Section - Full Width */}
      <div className={styles.heroImageWrapper}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
          alt="ArtVault Hero"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Hero Text aligned with container */}
        <div className={`${styles.heroText} container`}>
          <BlurText
            text="Discover, Collect, and Explore Art Like Never Before"
            as="h1"
            animateBy="words"
            delay={400}
            className={styles.heroHeader}
          />
          <p>Explore museum collections, learn about artists, and save your favorite artworks.</p>
          <Button
            onClick={() => router.push("/search")}
            variant="primary"
            size="lg"
          >
            Explore Art
          </Button>
        </div>
      </div>

      {/* About Section */}
      <Container className="py-5">
        <h2 >Welcome to ArtVault</h2>
        <p>
          ArtVault is your personal gateway to one of the world’s most famous art museums –
          The Metropolitan Museum of Art in New York City. Discover paintings, sculptures,
          textiles, ceramics, and more from thousands of years of human creativity.
        </p>
        <p>
          With ArtVault, you can:
        </p>
        <ul>
          <li>Search the MET collection using titles, tags, artists, or culture.</li>
          <li>Save your favorite artworks to your personal collection for easy access later.</li>
          <li>Explore pieces by medium or geographic location, highlighting your areas of interest.</li>
          <li>Keep a search history and revisit past queries for efficient exploration.</li>
        </ul>
        <p>
          ArtVault is designed to give art enthusiasts, students, and collectors a polished
          and intuitive way to explore, learn, and interact with world-class art from the comfort
          of your browser.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/register")}
        >
          Create an Account
        </Button>
      </Container>
      <Container className="py-5">
        <h3 >Why ArtVault?</h3>
        <p>
          ArtVault combines a sleek interface with powerful search tools, allowing you to browse
          the MET collection like never before. Whether you are researching for school, curating
          your own collection, or just exploring for inspiration, ArtVault puts the museum at your fingertips.
        </p>
      </Container>
    </>
  );
}