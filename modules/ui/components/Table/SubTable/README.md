<h1 align="center">Component SubTable</h1>

> Return a SubTable List

---

## Usage

this component is made for certain modules that have
some aditional listed data
...

## API

...

### Props

#### :data <sup>Array - default: [] - Required prop<sup>

Array of objects Data. Main dataSource for the table

#### :lineNumber <sup>Object - default: {} <sup>

Object for the pagination process

#### :rule <sup>Array - default: [] <sup>

Array of objects rules. Used for the input validation

#### :descriptionEmpty <sup>String - default: '' - Required prop<sup>

A message to appear when there's no data

#### :columns <sup>Array - default: [] - Required prop<sup>

List of the main columns

#### :customCols <sup>Array - default: [] <sup>

List of custom columns "template"

#### :draggable <sup>Object - default: {} <sup>

An object set in order to render the table draggable

...

### Events

#### @removeItem <sup>(data,id)<sup>

Action emitted to remove an item

- `data`: Array of values.
- `id`: id of selected item.

#### @editItem <sup>(record)<sup>

A row data emitted

- `data`: Array of values object.

## Dependencies

...

## Roadmap

....
