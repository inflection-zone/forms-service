# How to Embed Forms

This guide explains how to embed forms from the Forms Service into your website using the Charcoal Form Embed script.

## Overview

The Charcoal Form Embed script allows you to seamlessly integrate forms into any website by simply adding a few lines of HTML. The script automatically fetches form details and renders them in an iframe within a styled container.

## Quick Start

### 1. Add the Form Container

Add a div element with the `charcoal-form-embed` class and specify the form template ID using the `charcoal-data-form-id` attribute:

```html
<!-- Embed form -->
<div class="charcoal-form-embed" charcoal-data-form-id="{{TEMPLATE_ID}}"></div>
```

### 2. Load the Embed Script

Include the Charcoal Form Embed script in your page:

```html
<!-- Load your embed script -->
<script>{{JAVASCRIPT_EMBED_SCRIPT}}</script>
```

## Complete Example

Here's a complete HTML page example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website with Embedded Form</title>
</head>
<body>
    <h1>Welcome to Our Website</h1>
    <p>Please fill out the form below:</p>
    
    <!-- Form will be embedded here -->
    <div class="charcoal-form-embed" charcoal-data-form-id="{{TEMPLATE_ID}}"></div>
    
    <!-- Load the embed script -->
    <script>{{JAVASCRIPT_EMBED_SCRIPT}}</script>
</body>
</html>
```

## Configuration Options

### Form Container Attributes

| Attribute | Required | Description | Example |
|-----------|----------|-------------|---------|
| `class` | Yes | Must be `charcoal-form-embed` | `class="charcoal-form-embed"` |
| `charcoal-data-form-id` | Yes | The UUID of the form template | `charcoal-data-form-id="{{TEMPLATE_ID}}"` |

### Styling the Container

The script creates a responsive container with the following default styles:

- **Width**: 100% of parent container
- **Max Width**: 800px
- **Margin**: 0 auto (centered)
- **Border**: 1px solid #ccc
- **Border Radius**: 8px
- **Overflow**: hidden

You can customize the appearance by targeting the generated elements:

```css
/* Style the form container */
.charcoal-form-embed > div {
    max-width: 600px; /* Override max width */
    border: 2px solid #007bff; /* Custom border */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow */
}

/* Style the header */
.charcoal-form-embed .form-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-family: 'Arial', sans-serif;
}

/* Style the iframe */
.charcoal-form-embed iframe {
    min-height: 500px; /* Adjust height */
}
```

## Multiple Forms

You can embed multiple forms on the same page by adding multiple containers with charcoal-data-form-id. You need to include the script only once.

```html
<!-- First form -->
<div class="charcoal-form-embed" charcoal-data-form-id="form-id-1"></div>

<!-- Second form -->
<div class="charcoal-form-embed" charcoal-data-form-id="form-id-2"></div>

```

## Troubleshooting

### Form Not Loading

1. **Check the Form ID**: Ensure the `charcoal-data-form-id` attribute contains a valid UUID
2. **Verify API Endpoint**: Confirm the script URL is correct and accessible
3. **Check Network Tab**: Look for failed requests in browser developer tools
4. **CORS Issues**: Ensure your domain is allowed to make requests to the Forms Service

## Advanced Usage

### Custom Loading States

You can add custom loading indicators:

```html
<div class="charcoal-form-embed" charcoal-data-form-id="your-form-id">
    <div class="loading-spinner">
        <p>Loading form...</p>
    </div>
</div>

<style>
.loading-spinner {
    text-align: center;
    padding: 40px;
    color: #666;
}
</style>
```

### Conditional Loading

Load forms based on user conditions:

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Only load form for logged-in users
    if (userIsLoggedIn) {
        const formContainer = document.createElement('div');
        formContainer.className = 'charcoal-form-embed';
        formContainer.setAttribute('charcoal-data-form-id', 'your-form-id');
        document.getElementById('form-area').appendChild(formContainer);
    }
});
</script>
```
