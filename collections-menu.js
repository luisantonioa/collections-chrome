$(document.body).append('<div class="dp-add-button-light"></div>');

$('.dp-add-button-light').click(function(e) {
  e.stopPropagation();

  var asin_url_tokens = e.attr('href').split('/');
  var asin = asin_url_tokens[asin_url_tokens.length-1] || undefined;
  showCollectAsinForm(asin, null, null, false);
});

var links= $("a[href*='/dp/'], a[href*='/product/']");
links.css({"border-color": "#C1E0FF","border-width":"1px","border-style":"solid"});
links.popover({
  title: 'Collect this!',
  trigger: 'hover',
  html: true,
  delay: { show: 100, hide: 4000 },
  content: function() {
    return $('.popover_content_wrapper').html();
  }
//  content:'<div id="popover_content_wrapper" class="dp-add-button-light" onclick="showASIN(this);"></div>'
});

function showASIN(e) {
  var asin_url_tokens = e.attr('href').split('/');
  var asin = asin_url_tokens[asin_url_tokens.length-1] || undefined;
  showCollectAsinForm(asin, null, null, false);
}

function showCollectAsinForm(asin, marketplace_id, collection_item_id, in_page) {
  var width    = 590;
  var iframeSrc = queryStringAppend("/gp/ssx/collectlet/new", {asin: asin, marketplaceId: marketplace_id, collection_item_id: collection_item_id, in_page: in_page});

  showPopupForm(width, iframeSrc);
};

function showEditAsinForm(item_id) {
  var width   = 590;
  var iframeSrc = "/gp/ssx/collectlet/" + item_id +"/edit";
  showPopupForm(width, iframeSrc);
};

var PopoverController;

function showPopupForm(width, iframeSrc) {
  if (jQuery('#frameCollectlet').length > 0) return;
  var content = "<iframe id='frameCollectlet' frameborder='0' style='z-index:199;width:" + width + "px;height:372px;' scrolling='no' src='" + iframeSrc + "' allowtransparency='true' />";
  PopoverController = jQuery.AmazonPopover.displayPopover({
      modal: true,
      width: width,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      controlCallbacks : true,
      literalContent: content,
      skin: "<div><div class='ap_content'></div></div>"
  });
}

function hidePopupForm(reload) {
  if (PopoverController) {
    PopoverController.close();
    reload = typeof reload !== 'undefined' ? reload : false;
    if (reload) {
      document.location.reload(true);
    }
  }
}
;
function toQueryString(obj) {
  var params = [ ];
  jQuery.each(obj, function(name, value) {
    if (value !== undefined && value !== null) {
      params.push([encodeURIComponent(name),
                   encodeURIComponent(value)].join('='));
    }
  });
  return params.join('&');
};

//Query String Append
function queryStringAppend(url, qs) {
  if (typeof qs === 'object') { 
    qs = toQueryString(qs);
  }
  return url + (qs ? ((url.indexOf('?') >= 0 ? '&' : '?') + qs) : '');
};