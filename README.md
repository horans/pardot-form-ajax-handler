# Pardot Form AJAX Handler

"Pardot Form AJAX Handler", or "PFAH" in short,
will help to you setup an `AJAX` submission
for Salesforce [Pardot](https://www.pardot.com/) forms,
which were designed to submit with `POST` in `iframe`. With `JSONP`,
we can even handle the result from Pardot's redirect.

## Install

1. Extract and upload all the files in `dist` folder to your server.
    * e.g., `//sample.com/pfah/`.

## Setup

1. Add main script __after jQuery__ is introduced.
    * e.g., `<script src="//sample.com/pfah/pardot-form.js"></script>`
1. Go to [Pardot](https://pi.pardot.com/form) and edit success/error location of the form.
    * set "Success Location" as `//sample.com/pfah/pardot-form-callback-done.js`.
    * set "Error Location" as `//sample.com/pfah/pardot-form-callback-error.js`.

## Basic Usage

Once you've wrapped `.pfah-form` with `.pfah-wrapper`,
you are _good to go_!
`.pfah-done` or `.pfah-error` are shown when the result comes back from Pardot.

### Template

```html
<div class="pfah-wrapper">
  <form action="https://go.pardot.com/l/285052/2018-02-23/22nrnw" class="pfah-form">
    <input type="email" class="pfah-input" name="email" required />
    <input type="text" class="pfah-input" name="name" />
    <button type="submit" class="pfah-input">Submit</button>
  </form>
  <aside class="pfah-done">
    <div class="pfah-done-text">Thank you for your time!</div>
  </aside>
  <aside class="pfah-error">
    <span class="pfah-error-text">Something wrong, please try again!</span>
  </aside>
</div>
```

### Samples

For more examples, please check `demo` folder.

* __`demo-basic.html`__: Basic inpage and popup forms.
* __`demo-css.html`__: Form with preloaded style.
* __`demo-event.html`__: Form with event controls.
* __`demo-popup.html`__: Manually trigger popup when blocked.

### Notices

* Make sure that you have `[type="submit"]` button/input to submit your form.
* Multiple forms are supported, while same forms share same states.

## Advanced Usage

### Configuration

Extra configuration can pass to PFAH by add `data` properties to `.pfah-wrapper`.

* __`data-state="done"`__: PFAH will save "done/error" state into `localStorage` with `.pfah-wrapper` ID.
  * This attribute can be either "__done__", "__error__" or "__all__".
  * With form states, PFAH will show `.pfah-done` or/and `.pfah-error` next time when user visit the page.
* __`data-source="source"`__: PFAH will add a `[type="hidden"]` to pass current url to Pardot for tracking purpose.
  * This attribute can be customized according to your choice, but we suggest to use "__source__" or "__referrer__".
  * You have to add `source` or your customized field to Pardot form to make it work.
  * You have to make sure you haven't use the same name somewhere else in form.
* __`data-style="no"`__: Use this option to complete disable the style of PFAH by not load css file at all.
  * You can use this option if you decide to import css file by yourself.
  * This option will disable theme as well.
* __`data-error="keep"`__: Use this option to reserve the space for error message.
  * By default, PFAH will slide down the error message.
* __`data-remember="no"`__: Use this option to disable input auto-complete function.
  * By default, PFAH will keep value you input in `localStorage` with same name.

### Popup

1. Wrap your `.pfah-wrapper` in `.pfah-popup`.
1. Name your `.pfah-popup` with class or ID
    * e.g., `#my-form`.
    * Please __DO NOT__ name it with prefix of `pfah-`
1. Toggle popup with any element with `data-toggle="pfah-popup"`
    * Use `data-target` to link the element with PFAH
    * You can manually toggle popup if `click` event is blocked.
    * Clicking on any elements with `.pfah-close` will close current popup.
    * Use `.pfah-close-delay` on `<a>` if you decide to download then close popup.

```html
<button data-toggle="pfah-popup" data-target="#my-form"></button>
...
<div class="pfah-popup" id="my-form">
  <div class="pfah-wrapper">
    <i class="pfah-close-icon pfah-close pfah-icon"></i>
    ...
  </div>
</div>
```

### Checkbox

PFAH has a customized checkbox style.  
With `.pfah-check-required`, PFAH will show "error" state if those checkboxes were not selected on submit.

```html
<label class="pfah-check-item">
  <input class="pfah-check-input pfah-check-required" type="checkbox" checked>
  <span class="pfah-check-icon pfah-icon"></span>
  <span class="pfah-check-label">Agree terms.</span>
</label>
```

### Functions

* __`pfah.init()`__: PFAH will initialize automatically when `DOM` is ready. However you can manually perform it if forms are loaded into page asynchronously.
  * Load default form style (and extra theme).
  * Check form action url.
  * Generate ID.
  * Show stored state.
  * Load vendor js if there is a form shown in popup.
* __`pfah.callback({ result: state })`__: PFAH will callback from `pardot-form-callback-done.js` and `pardot-form-callback-error.js` automatically after a form is submitted. However you can manually if you want to simulate the form result.
  * Trigger callback events.
  * `state` can be "__done__" or "__error__".
  * `pfah.form.id` needs to be indicated before your call.
* __`pfah.popup(target)`__: If your `click` event is blocked on element, you can try to call it manually.
  * Trigger call popup event.

### Events

PFAH will log to `console` when some of following events happen to `.pfah-wrapper`:

* __`pfah.notpardot`__: A form `action` was not a proper Pardot iframe embed link.
* __`pfah.vendor`__: A vendor of PFAH is loading to page, with its name.
* __`pfah.ready`__: A form is ready to use, with `.pfah-wrapper` __id__.
* __`pfah.submit`__: A form was submitted to Pardot, with `.pfah-wrapper` __id__.
* __`pfah.callback`__: Received result from Pardot, with `.pfah-wrapper` __id__ and "__done__/__error__" result.
* __`pfah.popup`__: A popup is triggered by user, with `.pfah-wrapper` __id__ and "__open__/__close__" state.
* __`pfah.callpopup`__: PFAH is asked to show popup.

### Layout

* `.pfah-row-with-col`: The inputs in PFAH can be either take full width or only half of the row.

```html
<div class="pfah-row">
  <div class="pfah-col">
    ...
  </div>
</div>
...
<div class="pfah-row pfah-row-with-col">
  <div class="pfah-col">
    ...
  </div>
  <div class="pfah-col">
    ...
  </div>
</div>
```

* `.pfah-center`: Align text to center.

```html
<div class="pfah-title pfah-center">My Form</div>
```

* `.pfah-hidden`: Hide something from user.

```html
<div class="pfah-hidden">Secret</div>
```

### Themes

PFAH allow you to override default style by adding your own `css` file.
Different forms can use their own themes even they are on the same page.

1. upload `pardot-form-mytheme.css` to same folder you put PFAH.
    * e.g., `//sample.com/pfah/pardot-form-mytheme.css`
1. add `data-theme="mytheme"` to `.pfah-wrapper`.
    * Make sure your theme name is in lower case.

## More

### References

* JS Path: [stackoverflow.com/questions/2255689/](https://stackoverflow.com/questions/2255689/)
* JSONP: [stackoverflow.com/questions/47047487/](https://stackoverflow.com/questions/47047487/)

### Tools

* Dependency: [jQuery](https://github.com/jquery/jquery)
* Vendor: [bPopup](https://github.com/dinbror/bpopup), [jquery-throttle-debounce](https://github.com/cowboy/jquery-throttle-debounce), [get-current-path](https://github.com/horans/get-current-path)
* JS linter: [standard](https://github.com/standard/standard)
* CSS linter: [CSSLint](https://github.com/CSSLint/csslint)
* HTML linter: [htmllint](https://github.com/htmllint/htmllint)

### Change logs

__180903__

* path detect fallback

__180709__

* samples: css/popup
* events: ready/popup

__180629__

* debouce input
* more samples

__build 180626__

* allow same forms
* allow remember input

__180620__

* allow close popup

__180619__

* allow required checkbox
* allow text center

__180616__

* add icons
* add demo
* allow popup
* allow half row column

__180613__

* update basic style
* allow keep error message

__180608__

* allow source track
* allow style disable
* unify init function

__180607__

* initial release
