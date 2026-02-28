// components/FavouriteStar.jsx
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useState, useEffect } from 'react';

export default function FavouriteStar({ objectID, size = 26, top = 8, right = 8 }) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(favouritesList.includes(objectID.toString()));
    }, [favouritesList, objectID]);

    const handleToggle = async () => {
        const idStr = objectID.toString();
        try {
            if (isFavourite) {
                const updated = await removeFromFavourites(idStr);
                setFavouritesList(updated);
            } else {
                const updated = await addToFavourites(idStr);
                setFavouritesList(updated);
            }
        } catch (err) {
            console.error('Favourite toggle failed:', err);
        }
    };

    return (
        <button
            onClick={handleToggle}
            style={{
                position: 'absolute',
                top: `${top}px`,
                right: `${right}px`,
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                zIndex: 10,
                lineHeight: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease',
            }}
            className="favourite-btn"
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={isFavourite ? '#ffe600' : '#ffffff'}
                stroke="#ffe600" // black border
                strokeWidth="1"
                style={{
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
                    transition: 'fill 0.2s ease, transform 0.2s ease',
                }}
            >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        </button>
    );
}