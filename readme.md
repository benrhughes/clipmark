# ClipMark - convert Kindle notes and highlights to markdown

Kindle devices store a user's notes and highlights in a single file called `My Clippings.txt`. It has content for all books, whether Amazon-purchased or side-loaded. It is a single, flat text file with clippings from all books intermingled, which can make referencing or extracting your clippings difficult. 

ClipMark is a very simple nodejs app which
- parses `My Clippings.txt`
- groups the clippings by book
- sorts clippings by location
- attempts to remove duplicate highlights
- generates a markdown file per book 

NB: this only works for physical Kindle devices. Apps on various other platforms do not produce a `My Clippings.txt` file.

## Example output
```
# The Hour of the Star - Clarice Lispector

*28/05/2024 - 02/06/2024*

## Page 9
### Location 131
> Make no mistake, I only achieve simplicity with enormous effort.

### Location 138
> Happiness? I never saw a dumber word, invented by all those northeastern girls out there.

## Page 13
### Location 191
> The person I’m going to talk about is so dumb that she sometimes smiles at other people on the street.
```

## Running
### Prerequisites

- nodejs (v18 or later - earlier versions might work but have not been tested)
- the "My Clippings.txt" file from a Kindle device


### Run
To run ClipMark, you only require the files in the `app` folder. Download them, then run:

```
$> node app/clipmark.js path/to/My\ Clippings.txt
```

A folder called `clippings` will be created in the current directory, and a file will be created there for each book that has clippings. 

**NB** existing files will be overwritten.

## Building
### Prerequisites
- git
- nodejs v18+
- typescript (`npm install -g typescript`)

### Build
```
$> git clone https://github.com/benrhughes/clipmark.git
$> cd clipmark
$> tsc
```


