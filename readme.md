# Kindle Clippings to Markdown converter

## Prerequisits
- nodejs
- the "My Clippings.txt" file from a Kindle device

## Running
On the commandline:

```
$> node dest/app.js path/to/My\ Clippings.txt
```

A folder called `clippings` will be created in the current directory, and a file will be created there for each book that has clippings. 

NB existing files will be overwritten.

## Building

There are no external dependencies (other than type info) so you can simply clone then run:

```
$> tsc
```
