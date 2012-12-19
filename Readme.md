
# delegates

  Higher level dom event delegation management based on [EventManager](https://github.com/component/event-manager).

## Installation

    $ component install component/delegates

## Example

```js
var delegates = require('delegates');
var el = document.querySelector('ul');

var view = new ListView(el);

function ListView(el) {
  this.events = delegates(el, this);
  this.events.bind('click li', 'remove');
}

ListView.prototype.remove = function(e){
  var el = e.target;
  console.log('remove %s', el.textContent);
  el.parentNode.removeChild(el);
};
```

## API

  See [component/event-manager](https://github.com/component/event-manager).

## License

  MIT
