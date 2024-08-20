# Random Poetry Generator (RPG)

It has been stated that a [monkey hacking away at a typewriter](https://en.wikipedia.org/wiki/Infinite_monkey_theorem) for an `infinite` amount of time will, at some point, generate the complete works of Shakespear.

It is now our turn to postulate a modern reinterpretation of this problem, so we shift our attention to the stock market.  
What poems can the ever-fluctuating price of a given stock generate if we map its price differential to the english alphabet?

### Our data stream

We will use the websocket feed from [finnhub](https://finnhub.io/docs/api/websocket-trades) to access real-time data of a stock.

### How each poem will be generated

As the price of the stock changes from one moment to the next, we map[^1] this difference `Δp` to a symbol `a,b,c,...,z` of the english alphabet.  
This mapping generates strings of characters that we then check to see if they are legible words.

A string of characters will be called a `word` if it belongs to some english dictionary[^2].  
Once we find a `word` we place it aside and continue generating strings.  
Once we have enough[^3] words to produce a syntactically correct sentence we place it inside the body of our `poem` as a generated line.

We shall not trouble ourselves with semantics, so for instance [Colorless green ideas sleep furiously](https://plato.stanford.edu/entries/category-mistakes/) will be considered a correct sentence for the goals of this project.

[^1]:
    Our map is naive. We subdivide the unit interval `[0,1]` equally into 26 sections, one for each letter.  
    Each price value first gets normalized to the unit range and then is assigned a letter depending on the sub-interval it belongs to.

[^2]: We will use a client-side implementation to lookup words. TODO

[^3]: We will pick a number, `3 <= x <= 10`, at random in order to decide the length of each line.
