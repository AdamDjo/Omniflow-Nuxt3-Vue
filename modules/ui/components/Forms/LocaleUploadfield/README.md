<h1 align="center">Component LocaleUploadfield</h1>

> Return a localized upload field inputs

---

## Usage

...

## API

...

### Props

#### :languagesData <sup>Array - default: [] - Required prop<sup>

Array of objects language. Each language must contain isoCode & value keys

#### :listOfValues <sup>Array - default: [] <sup>

Array of objects values. Used in edit mode to display prefilled inputs value

#### :rule <sup>Array - default: [] <sup>

Array of objects rules. Used for the input validation

#### :name <sup>String - default: '' - Required prop<sup>

name of entity.

#### :label <sup>String - default: '' - Required prop<sup>

Label of the inputs.

#### :disabled <sup>Boolean - default: false <sup>

Used to disable the inputs.

#### :errorDisabledMsg <sup>String - default: '' <sup>

Used to display a msg when the user click on upload if the disabled prop is set to true.

#### :readOnly <sup>Boolean - default: false <sup>

Used to make the inputs in mode readOnly.

#### :relatedKey <sup>String - default: null <sup>

Used to set the name of the prop of the inputs.

#### :acceptOnly <sup>String - default: '\*' <sup>

File types that can be accepted.

#### :errorMessage <sup>String - default: '' <sup>

Error message to display when the type of the file uploaded is not accepted from prop acceptOnly.

#### :pathAssetManager <sup>String - default: '' <sup>

Folder path in the asset manager.

#### :showLangs <sup>Boolean - default: false <sup>

Used to display the globe for the inputs

...

### Events

#### @clearValidate <sup>()<sup>

Action emitted to clear error message

#### @formData <sup>(data, name)<sup>

The data emitted with the new values to update global form values

- `data`: Array of values object with isoCode & value keys.
- `name`: The name of textfield

## Dependencies

...

## Roadmap

....
