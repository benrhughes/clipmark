# ClipMark - convert Kindle notes and highlights to markdown

Kindle devices store a user's notes and highlights in a single file called `My Clippings.txt`. It has content for all books, whether Amazon-purchased or side-loaded. It is a single, flat text file with clippings from all books intermingled, which can make referencing or extracting your clippings difficult. 

ClipMark is a very simple nodejs app which
- parses `My Clippings.txt`
- groups the clippings by book
- sorts clippings by location
- attempts to remove duplicate highlights
- generates a markdown file per book 

NB: this only works for physical Kindle devices. Apps on various other platforms do no produce a `My Clippings.txt` file.

## Running
### Prerequisites

- nodejs (v18 or later - earlier versions might work but have not been tested)
- the "My Clippings.txt" file from a Kindle device


To run ClipMark, you only require the files in the `dest` folder. Download them, then run:

```
$> node dest/app.js path/to/My\ Clippings.txt
```

A folder called `clippings` will be created in the current directory, and a file will be created there for each book that has clippings. 

**NB** existing files will be overwritten.

## Building
### Prerequisits
- git
- nodejs v18+
- typescript (`npm install -g typescript`)

```
$> git clone https://github.com/benrhughes/clipmark.git
$> cd clipmark
$> tsc
```


