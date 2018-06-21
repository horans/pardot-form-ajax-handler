# Pardot Form AJAX Handler

"Pardot Form AJAX Handler", or "PFAH" in short, will help to you setup an `AJAX` submission for Salesforce [Pardot](https://www.pardot.com/) forms, which were designed to submit with `POST` in `iframe`. With `JSONP`, we can even handle the result from Pardot's redirect.

## Install

1. Extract and upload all the files in `dist` folder to your server.
    * e.g., `//sample.com/pfah/`.

## Setup

1. Add main script __after jQuery__ is introduced.
    * e.g., `<script src="//sample.com/pfah/pardot-form.js"></script>`
2. Go to [Pardot](https://pi.pardot.com/form) and edit success/error location of the form.
    * set "Success Location" as `//sample.com/pfah/pardot-form-callback-done.js`.
    * set "Error Location" as `//sample.com/pfah/pardot-form-callback-error.js`.

## Basic Usage

Once you've wrapped `.pfah-form` with `.pfah-wrapper`, you are _good to go_!  
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

For more examples, please check `demo.html`.

### Notices

* Make sure that you have `[type="submit"]` button/input to submit your form.
* Please __DO NOT__ give ID to `.pfah-wrapper`, PFAH will ID it automatically.
* Multiple forms are supported (different Pardot forms).

## Advanced Usage

### Configuration

Extra configuration can pass to PFAH by add `data` properties to `.pfah-wrapper`.

* __`data-state="done"`__: PFAH will save "done/error" state into `localStorage` with `.pfah-wrapper` ID.
  + This attribute can be either "__done__", "__error__" or "__all__".
  + With form states, PFAH will show `.pfah-done` or/and `.pfah-error` next time when user visit the page.
* __`data-source="source"`__: PFAH will add a `[type="hidden"]` to pass current url to Pardot for tracking purpose.
  + This attribute can be customized according to your choice, but we suggest to use "__source__" or "__referrer__".
  + You have to add `source` or your customized field to Pardot form to make it work.
  + You have to make sure you haven't use the same name somewhere else in form.
* __`data-style="no"`__: Use this option to complete disable the style of PFAH by not load css file at all.
  + You can use this option if you decide to import css file by yourself.
  + This option will disable theme as well.
* __`data-error="keep"`__: Use this option to reserve the space for error message.
  + By default, PFAH will slide down the error message.

### Popup

1. Wrap your `.pfah-wrapper` in `.pfah-popup`.
2. Name your `.pfah-popup` with class or ID
    * e.g., `#my-form`.
    * Please __DO NOT__ name it with prefix of `pfah-`
3. Toggle popup with any element with `data-toggle="pfah-popup"`
    * Use `data-target` to link the element with PFAH
    * You can manually toggle popup by [bPopup](https://github.com/dinbror/bpopup).
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

PFAH will initialize automatically when `DOM` is ready. However you can manually perform it if forms are loaded into page asynchronously.

* __`pfah.init()`__:
  + Load default form style (and extra theme).
  + Check form action url.
  + Generate ID.
  + Show stored state.
  + Load vendor js if there is a form shown in popup.

PFAH will callback from `pardot-form-callback-done.js` and `pardot-form-callback-error.js` automatically after a form is submitted. However you can manually if you want to simulate the form result.

* __`pfah.callback({ result: state })`__:
  + Trigger callback events.
  + `state` can be "__done__" or "__error__".
  + `pfah.form.id` needs to be indicated before your call.

### Events

PFAH will log to `console` when following events happen to `.pfah-wrapper`:

* __`pfah.notpardot`__: a form `action` was not a proper Pardot iframe embed link.
* __`pfah.submit`__: a form was submitted to Pardot with `.pfah-wrapper` __id__.
* __`pfah.callback`__: received result from Pardot with `.pfah-wrapper` __id__ and "__done__/__error__" as extra parameters.

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

### Themes

PFAH allow you to override default style by adding your own `css` file.  
Different forms can use their own themes even they are on the same page.

1. upload `pardot-form-mytheme.css` to same folder you put PFAH.
    * e.g., `//sample.com/pfah/pardot-form-mytheme.css`
2. add `data-theme="mytheme"` to `.pfah-wrapper`.
    * Make sure your theme name is in lower case.

## More

### References

* JS Path: [stackoverflow.com/questions/2255689/](https://stackoverflow.com/questions/2255689/)
* JSONP: [stackoverflow.com/questions/47047487/](https://stackoverflow.com/questions/47047487/)

### Tools

* Dependency: [jQuery](https://github.com/jquery/jquery)
* Vendor: [bPopup](https://github.com/dinbror/bpopup)
* JS linter: [standard](https://github.com/standard/standard)
* CSS linter: [CSSLint](https://github.com/CSSLint/csslint)
* HTML linter: [htmllint](https://github.com/htmllint/htmllint)

### Change logs

__build 180620__

* allow close popup

---

__build 180619__

* allow required checkbox
* allow text center

---

__build 180616__

* add icons
* add demo
* allow popup
* allow half row column

---

__build 180613__

* update basic style
* allow keep error message

---

__build 180608__

* allow source track
* allow style disable
* unify init function

---

__build 180607__

* initial release
