# nunjucks-capture

A nunjucks port of the [Liquid Capture tag](https://docs.shopify.com/themes/liquid-documentation/tags/variable-tags#capture)

## Install

```sh
npm install nunjucks-capture
```

## Usage

Add the extension to the Nunjucks environment:

```js
var nunjucks = require('nunjucks');
var CaptureTag = require('ninjucks-capture');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
env.addExtension('CaptureTag', new CaptureTag());
```

Capture some content as a string:

```html+jinja
{% capture as="demo" -%}
    <h2>Hello, world!</h2>
    {% include 'includes/content.html' %}
{%- endcapture %}

{{ demo }}

<pre>
    {{ demo | e }}
</pre>

```

will result in:

```html
    <h2>Hello, world!</h2>
    <p>This is the included content</p>
    <pre>
        &lt;h2&gt;Hello, world!&lt;/h2&gt;
        &lt;p&gt;This is the included content&lt;/p&gt;
    </pre>
```

Everything between the two tags is stored in a new variable as a string. Dynamic content, such as includes or loops, are evaluated before the variable is stored. This means you've captured the resulting content, not the templating.
