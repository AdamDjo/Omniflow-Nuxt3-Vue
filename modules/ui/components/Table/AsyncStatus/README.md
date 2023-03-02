<h1 align="center">Component AsyncStatus</h1>

> Return a switch button

---

## API

### Props

- Data record of table : type = object
- status : status of item (activate/desactivate publish/unpublish) type = Boolean
- sureUnpublish : confirmation msg : type = String
- surePublish : confirmation msg : type = String
- isNotChecked : name of status when switch button is not checked
- isChecked : name of status when switch button is checked
- keyStatus : name of attribute

#### :propExample <sup>Array - default: [] - Required prop<sup>

- :Data <sup>Object - default: {} - Required prop<sup>
- :status : <sup>Boolean - default: false - Required prop<sup>
- :sureUnpublish : <sup>String - default: '' - Required prop<sup>
- :surePublish : <sup>String - default: '' - Required prop<sup>
- isNotChecked : <sup>String - default: '' - Required prop<sup>
- isChecked : <sup>String - default: '' - Required prop<sup>
- keyStatus : <sup>String - default: '' - Required prop<sup>

### Events

useConfirm

#### @useConfirm <sup>useConfirm()<sup>

Detail

- `putStatus`: return new status

## Dependencies

AsyncResultTable
