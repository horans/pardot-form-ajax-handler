# Pardot Form AJAX Handler

"Pardot Form AJAX Handler", or "PFAH" in short, will help to you setup an `AJAX` submission for [Pardot](https://www.pardot.com/) forms, which were designed to submit with `POST` in `iframe`. With `JSONP`, we can even handle the result from Pardot's redirect.

## Install

1. Extract and upload all the files in `dist` folder to your server.
    * e.g., `//sample.com/pardot-form/`.

## Setup

1. Add main script __after jQuery__.
    * e.g., `<script src="//sample.com/pardot-form/pardot-form.js"></script>`

2. Go to [Pardot](https://pi.pardot.com/form) and edit success/error location of the form.
    * set "Success Location" as `//sample.com/pardot-form/pardot-form-callback-done.js`.
    * set "Error Location" as `//sample.com/pardot-form/pardot-form-callback-error.js`.

## Basic Usage

Once you've wrapped `.pfah-form` with `.pfah-wrapper`, you are good to go!  
`.pfah-done` or `.pfah-error` are shown when the result comes back from Pardot.

### Template

    <div class="pfah-wrapper">
      <form action="https://go.pardot.com/l/285052/2018-02-23/22nrnw" class="pfah-form">
        <input type="email" class="pfah-input" name="email" />
        <input type="text" class="pfah-input" name="firstname" />
        <input type="text" class="pfah-input" name="lastname" />
        <button type="submit" class="pfah-input">Submit</button>
      </form>
      <aside class="pfah-done">
        <div class="pfah-done-text">Thank you for your time!</div>
      </aside>
      <aside class="pfah-error">
        <span class="pfah-error-text">Something wrong, please try again!</span>
      </aside>
    </div>

### Samples

_(TO BE DONE)_

### Notices

* Make sure that you have `[type="submit"]` button/input to submit your form.

## Advanced Usage

### Configuration

Extra configuration can pass to PFAH by add `data` properties to `.pfah-wrapper`.

* __`data-state="done"`__: PFAH will save "done/error" state into `localStorage` with `[.pfah-wrapper]` ID.
    * This attribute can be either `done`, `error` or `all`.
    * With form states, PFAH will show `.pfah-done` or/and `.pfah-error` next time when user visit the page.
* __`data-source="source"`__: PFAH will add a `[type="hidden"]` to pass current url to Pardot for tracking purpose.
    * This attribute can be customized according to your choice, but we suggest to use `source` or `referrer`.
    * You have to add `source` or your customized field to Pardot form to make it work.
    * You have to make sure you haven't use the same name somewhere else in form already.
* __`data-style="no"`__: Use this option to complete disable the style of PFAH by not load css file at all.
    * This option will disable theme as well.

### Popup

_(TO BE DONE)_

### Functions

PFAH will initialize automatically when `DOM` is ready, however you can manually perform them if forms are loaded into page asynchronously.

* __`pfah.init.form()`__: Check action url, generate id and show stored state.
* __`pfah.init.style()`__: Add basic form style and extra theme.
* __`pfah.init.vendor()`__: Load vendor js if the form is show on popup.

### Events

PFAH will log to `console` when following events happen to `.pfah-wrapper`:

* __`pfah.notpardot`__: a form `action` was not a proper Pardot iframe emebed link.
* __`pfah.submit`__: a form was submitted to Pardot with `.pfah-wrapper` __id__.
* __`pfah.callback`__: received result from Pardot with `.pfah-wrapper` __id__ and "__done__/__error__" as extra parameters.

### Themes

PFAH allow you to override default style by adding your own `css` file.

1. upload `pardot-form-mytheme.css` to same folder you put PFAH.
    * e.g., `//sample.com/pardot-form/pardot-form-mytheme.css`
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

### Change logs

* build 180608
    * allow source track
    * allow style disable
    * update asset load
    * update states save

* build 180607
    * initial release
