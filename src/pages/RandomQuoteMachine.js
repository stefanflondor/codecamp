import React, { useState, useEffect } from 'react';

const quotes = [
    {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
    },
    {
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        author: "Albert Einstein"
    },
    {
        text: "So many books, so little time.",
        author: "Frank Zappa"
    },
    {
        text: "A room without books is like a body without a soul.",
        author: "Marcus Tullius Cicero"
    },
    {
        text: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost"
    }
];

function RandomQuoteMachine() {
    const [quote, setQuote] = useState({});

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    useEffect(() => {
        getRandomQuote();
    }, []);

    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
            <div id="quote-box" style={{ maxWidth: '600px', textAlign: 'center', border: '2px solid #333', padding: '2rem', borderRadius: '8px' }}>
                <p id="text" style={{ fontSize: '1.5rem' }}>{quote.text}</p>
                <p id="author" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>- {quote.author}</p>
                <div style={{ marginTop: '2rem' }}>
                    <button id="new-quote" onClick={getRandomQuote} style={{ marginRight: '1rem' }}>
                        New Quote
                    </button>
                    <a
                        id="tweet-quote"
                        href={tweetURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Tweet Quote
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomQuoteMachine;
