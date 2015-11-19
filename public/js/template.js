/**
 * manages the main page's content
 * @type {Object}
 * @name ViewManager
 */
var ViewManager = {

  /**
   * Object of all the cached templates (name=>template)
   * @type {Object}
   * @private
   */
  templates: {},
  current: null,

  /**
   * Initalizes an instance of ViewManager
   * @param  {Client}   app      the app running this instance of ViewManager
   * @param  {Function} callback callback to be called when done initializing
   */
  initialize: function(callback) {
    this._cacheAllTemplates(callback);
  },

  /**
   * downloads all the HTML template files and caches them
   * @param  {Function} callback the function to be called when done
   * @private
   */
  _cacheAllTemplates: function(callback) {
    var self = this;
    var m = this.getMustache();

    var length = $('[type="x-tmpl-mustache"]').length;
    var i = 0;

    $('[type="x-tmpl-mustache"]').each(function() {
      var _element = this;

      $.ajax({
        url: $(_element).attr("src"),
      }).done(function(data) {
        i++;

        self.templates[$(_element).attr("name")] = data;
        m.parse(data);

        console.log("Loaded template: " + $(_element).attr("name"));

        if(i >= length) {
          callback();
        }
      });

    });

  },

  render: function(content, data) {
    if(content in this.templates) {
      this.current = content;
      content = this.getTemplate(content);
    }

    $("#content").html(this.getMustache().render(content, data));
  },

  /**
   * sets the current content of the main page
   * @param  {String} content  the content to be set
   */
  setContent: function(content) {
    if(content in this.templates) {
      content = this.getTemplate(content);
    }
    this._currentContent = content;
    $("#content").html(content);
  },

  getMustache: function() {
    return Mustache;
  },

  /**
   * gets a template by name
   * @param  {string} name the template's name
   * @return {string}      the template
   */
  getTemplate: function(name) {
    return this.templates[name];
  }

}
