# Pardot Form AJAX Handler

"Pardot Form AJAX Handler", or "PFAH" in short, will help to you setup an `AJAX` submission for [Pardot](https://www.pardot.com/) forms, which were designed to submit with `POST` in `iframe`. With `JSONP`, we can even handle the result from Pardot's redirect.

## Install

1. Extract and upload all the files in `dist` folder to your server.
    * e.g., `//sample.com/pardot-form/`.

## Setup

1. Add main script after jQuery.
    * e.g., `<script src="//sample.com/pardot-form/pardot-form.js"></script>`

2. Go to [Pardot](https://pi.pardot.com/form) and edit success/error location of the form.
    * set "Success Location" as `//sample.com/pardot-form/pardot-form-callback-done.js`.
    * set "Error Location" as `//sample.com/pardot-form/pardot-form-callback-error.js`.

## Basic Usage

Once you've wrapped `pfah-form` with `pfah-wrapper`, you are good to go!  
`pfah-done` or `pfah-error` are shown when the result comes back from Pardot.

### Template

    <div class="pfah-wrapper">
      <form action="https://go.pardot.com/l/285052/2018-02-23/22nrnw" class="pfah-form">
        <div>
          <input type="email" class="pfah-input" name="email" />
          <input type="text" class="pfah-input" name="firstname" />
          <input type="text" class="pfah-input" name="lastname" />
          <button type="submit" class="pfah-input">Submit</button>
        </div>
        <aside class="pfah-done">
          <div class="pfah-done-text">Thank you for your time!</div>
        </aside>
        <aside class="pfah-error">
          <span class="pfah-error-text">Something wrong, please try again!</span>
        </aside>
      </form>
    </div>

## Advanced Usage

### Configuration

Extra configuration can pass to PFAH by add `data` properties to `pfah-wrapper`.

* `data-state="no"`: PFAH will not save "done" state into `localStorage`, and will not show `pfah-done` next time when user visit the page.

### Popup

(TO BE DONE)

### Functions

PFAH will initialize automatically when `DOM` is ready, however you can manually perform them if forms are loaded into page asynchronously.

* `pfah.init.form()`: Check action url, generate id and show `pfah-done` base on `localStorage`.
* `pfah.init.style()`: Add basic form style and extra theme.
* `pfah.init.vendor()`: Load vendor js if the form is show on popup.

### Events

PFAH will log to `console` when following events happen to `pfah-wrapper`:

* `pfah.form.error`: a form `action` was not a proper Pardot link.
* `pfah.callback`: received result from Pardot with "done/error" and `pfah-wrapper` id as extra parameters.

### Themes

PFAH allow you to override default style by adding your own `css` file.

1. add `pardot-form-mytheme01.css` to `//sample.com/pardot-form/`.
2. add `data-style="mytheme01"` to `pfah-wrapper`.

## About

* Dependency: [jQuery](https://github.com/jquery/jquery)
* Vendor: [bPopup](https://github.com/dinbror/bpopup)
* JS linter: [standard](https://github.com/standard/standard)
* CSS linter: [CSSLint](https://github.com/CSSLint/csslint)