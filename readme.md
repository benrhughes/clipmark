# Kindle Clippings to Markdown converter

Kindle devices store a user's notes and highlights in a single file called `My Clippings.txt`. It has content for all books, whether Amazon-purchased or side-loaded. It is just a single, flat text file with clippings from all books intermingled, which can make referencing your clippings difficult. 

ClipMark is a very simple nodejs app which parses `My Clippings.txt`, groups the clippings by book, sorts them by location, and generates a markdown file per book. 

## Prerequisites

- nodejs (v18 or later - earlier versions might work but have not been tested)
- the "My Clippings.txt" file from a Kindle device

## Running

To run ClipMark, you only require the files in the `dest` folder. Download them, then run:

```
$> node dest/app.js path/to/My\ Clippings.txt
```

A folder called `clippings` will be created in the current directory, and a file will be created there for each book that has clippings. 

**NB** existing files will be overwritten.

## Building

```
$> git clone https://github.com/benrhughes/clipmark.git
$> cd clipmark
$> tsc
```


