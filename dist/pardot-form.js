/****************************************************
*  project: pardot form ajax handler                *
*  description: main script                         *
*  author: horans@gmail.com                         *
*  url: github.com/horans/pardot-form-ajax-handler  *
*  update: 170626                                   *
****************************************************/

/* global $ */

// namespace
var pfah = {}

// get script path
// stackoverflow.com/questions/2255689/
var pScripts = document.getElementsByTagName('script')
pfah.src = pScripts[pScripts.length - 1].src
pfah.path = pfah.src.substring(0, pfah.src.lastIndexOf('/') + 1)

// load asset
pfah.asset = function (type, asset) {
  if (type !== 'vendor') type = 'style'
  if ($('head #' + type + '-' + asset).length === 0) {
    var a = document.createElement(type === 'vendor' ? 'script' : 'link')
    a.id = type + '-' + asset
    if (type === 'vendor') {
      a.src = pfah.path + 'vendor/' + asset + '.min.js'
    } else {
      a.rel = 'stylesheet'
      a.href = pfah.path + 'pardot-form' + (asset === 'pfah' ? '' : ('-' + asset)) + '.css'
    }
    document.getElementsByTagName('head')[0].appendChild(a)
  }
}

// set value
pfah.remember = function () {
  $('.pfah-input').each(function () {
    if ($(this).closest('.pfah-wrapper').data('remember') !== 'no') {
      $(this).val(window.localStorage.getItem('pfah-' + $(this).attr('name')))
    }
  })
}

// initialize
pfah.init = function () {
  if ($('.pfah-wrapper').length > 0) {
    var n = $('.pfah-wrapper:last').data('style') === 'no'
    // default style
    if (!n) pfah.asset('style', 'pfah')
    // all forms
    $('.pfah-wrapper').each(function () {
      // customize theme
      if (!n) {
        var t = $(this).data('theme')
        if (t) pfah.asset('style', t.toLowerCase())
      }
      // check form link
      var p = $(this).find('.pfah-form').attr('action')
      if (p.indexOf('go.pardot.com') < 0) {
        $(this).trigger('pfah.notpardot')
          .find('[type="submit"]').attr('disabled', 'disabled')
        window.console.log('[pfah] not a pardot form')
      } else {
        // add source track
        var s = $(this).data('source')
        if (s && $(this).find('.pfah-form').find('[name="' + s + '"]').length === 0) {
          $(this).find('.pfah-form').prepend('<input type="hidden" name="' + s + '" value="' + window.location.href + '" />')
        }
        // add id
        var i = p.substring(p.lastIndexOf('/') + 1)
        $(this).attr('data-id', 'pfah-' + i)
        // load state
        var l = window.localStorage.getItem('pfah-' + i)
        if (l) $(this).addClass('pfah-result-' + l)
      }
    })
  }
  // popup
  if ($('.pfah-popup').length > 0) pfah.asset('vendor', 'jquery.bpopup')
  // set value
  pfah.remember()
}

// form state
pfah.form = {
  id: '',
  load: false
}

// callback
pfah.callback = function (res) {
  $('[data-id="' + pfah.form.id + '"]:first').trigger('pfah.callback', [pfah.form.id, res.result])
  window.console.log('[pfah] callback ' + res.result)
}

// document ready
$(function () {
  // initialize
  pfah.init()

  // submit form
  $('body').on('submit', '.pfah-wrapper', function (e) {
    e.preventDefault()
    if (!pfah.form.load) {
      pfah.form.id = $(this).data('id')
      // check required checkbox
      var c = $(this).find('.pfah-check-required')
      if (c.length > 0 && c.length !== c.filter(':checked').length) {
        pfah.callback({ result: 'error' })
      } else {
        pfah.form.load = true
        var f = $(this).find('.pfah-form')
        f.find('[type="submit"]').attr('disabled', 'disabled')
        window.console.log('[pfah] form submit')
        $(this).trigger('pfah.submit', pfah.form.id)
        // stackoverflow.com/questions/47047487/
        $.ajax({
          url: f.attr('action'),
          method: 'POST',
          data: f.serialize(),
          dataType: 'jsonp'
        })
      }
    }
  })

  // callback handler
  $('body').on('pfah.callback', function (e, id, result) {
    var s = $('[data-id="' + id + '"]').data('state').toLowerCase()
    if (s && (result === s || s === 'all')) window.localStorage.setItem(pfah.form.id, result)
    $('[data-id="' + pfah.form.id + '"]').removeClass('pfah-result-error pfah-result-done').addClass('pfah-result-' + result)
      .find('[type="submit"]').removeAttr('disabled')
    pfah.form.id = ''
    pfah.form.load = false
  })

  // close error message
  $('body').on('click', '.pfah-error', function () {
    var f = $(this).closest('.pfah-wrapper')
    f.removeClass('pfah-result-error')
    window.localStorage.removeItem(f.data('id'))
  })

  // open popup
  $('body').on('click', '[data-toggle="pfah-popup"]', function () {
    var t = $(this).data('target')
    if (t) pfah.popup = $(t).bPopup({ closeClass: 'pfah-close' })
  })

  // close popup with delay
  $('body').on('click', '.pfah-close-delay', function () {
    setTimeout(function () {
      pfah.popup.close()
    }, 200)
  })

  // remeber inputs
  $('body').on('change paste keyup', '.pfah-input', function () {
    if ($(this).closest('.pfah-wrapper').data('remember') !== 'no') {
      window.localStorage.setItem('pfah-' + $(this).attr('name'), $(this).val())
      pfah.remember()
    }
  })
})
