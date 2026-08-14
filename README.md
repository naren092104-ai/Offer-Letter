# AutoRevive Document Builder

IMPORTANT UPDATE TO THE PREVIOUS REQUIREMENTS

Change the branding and asset system as follows.

========================================================

1. DEFAULT AUTOREVIVE BRANDING

========================================================

The application must NOT ask the user to upload:

- Company Logo

- Watermark

- Header

- Footer

These must be DEFAULT and built into the application based on the uploaded reference PDF:

"Gopika L LOI.pdf"

The reference PDF is the source for the AutoRevive document branding.

Use the branding/design from the reference document as the default document template.

The user should NOT need to configure these every time.

========================================================

2. DEFAULT LOGO

========================================================

AutoRevive logo must be included by default.

Do NOT create:

"Upload Company Logo"

in the main document generation form.

The logo should automatically appear in:

- Live A4 Preview

- Generated PDF

- Print

The logo should be stored as a project asset inside:

src/assets/

or an equivalent frontend asset directory.

Example:

src/assets/autorevive-logo.png

If the actual logo asset can be extracted/recreated from the supplied reference document, use the closest faithful version.

Do NOT ask the HR user to upload it every time.

========================================================

3. DEFAULT WATERMARK

========================================================

AutoRevive watermark must also be DEFAULT.

Do NOT show:

"Upload Watermark"

in the normal document creation form.

The watermark should automatically appear behind the document content.

Use the AutoRevive vehicle/brand watermark from the reference document as the design reference.

Default settings:

Opacity:

Very Low / Light

Position:

Centered

Size:

Large

Layer:

Behind content

The watermark must appear on every generated page where appropriate.

========================================================

4. DEFAULT HEADER

========================================================

The document header must be built into the template.

Do NOT make the user upload a header.

The header should follow the reference PDF.

It should contain:

AutoRevive logo

Company contact information

Branded layout

Decorative line/design

The header must automatically appear on every page of the generated document.

The header should be implemented as a reusable React component:

DocumentHeader.tsx

========================================================

5. DEFAULT FOOTER

========================================================

The document footer must also be built into the template.

Do NOT make the user upload a footer.

Follow the reference PDF's footer design.

Include the company address/contact details as shown in the reference document.

The footer must automatically appear on every page.

Create:

DocumentFooter.tsx

========================================================

6. COMPANY BRANDING MUST BE TEMPLATE-BASED

========================================================

Do not expose logo/header/footer configuration in the main generator.

The normal HR workflow should be:

Select Document Type

↓

Enter Candidate Details

↓

Enter Internship/Employee Details

↓

Upload Signature / E-Sign

↓

Preview

↓

Generate PDF

No branding configuration should be required.

========================================================

7. ONLY SIGNATURE SHOULD BE USER-UPLOADABLE

========================================================

The ONLY document asset the HR user normally needs to provide is:

HR Signature / E-Signature

Create a section:

SIGNATURE

Options:

A. Upload Signature Image

B. Draw Signature

C. Type Signature

========================================================

8. SIGNATURE IMAGE UPLOAD

========================================================

Allow:

PNG

JPG

JPEG

WEBP

Recommended:

PNG with transparent background.

After upload:

- Show preview

- Allow replace

- Allow remove

- Allow resize

- Allow position adjustment

The signature must appear in the final document and PDF.

========================================================

9. DRAW / E-SIGNATURE

========================================================

Add an optional:

"Draw Signature"

button.

When clicked:

Open a signature pad.

User can draw their signature using:

- Mouse

- Trackpad

- Touchscreen

- Pen/stylus

Buttons:

Clear

Undo

Save Signature

Cancel

Convert the drawn signature into an image with transparent background where possible.

Place the e-signature automatically in the HR signature section.

========================================================

10. TYPE SIGNATURE

========================================================

Also provide:

"Type Signature"

Allow the user to type:

Jemsina Banu S

Provide a small set of formal signature-style fonts available locally/in the browser.

Preview the typed signature.

Allow:

Apply Signature

Cancel

IMPORTANT:

This is a visual electronic signature option only.

Do not claim that the application provides legally certified digital signatures.

========================================================

11. SIGNATURE POSITION

========================================================

Signature should appear in the final section:

For,

AutoRevive

[Signature]

Jemsina Banu S

Human Resources

AutoRevive

The signature image should automatically fit within a reasonable signature box.

Do not distort the signature aspect ratio.

========================================================

12. DEFAULT SIGNATURE BEHAVIOUR

========================================================

If no signature is provided:

Show a clean placeholder in preview:

"Signature"

But:

Do NOT include the placeholder in the final PDF.

Instead, show a validation message:

"Please add an HR signature before generating the final PDF."

OR provide an explicit:

"Generate without signature"

option only if desired.

Default behavior should require a signature.

========================================================

13. REMOVE PREVIOUS UPLOAD OPTIONS

========================================================

Remove these from the application:

Upload Company Logo

Upload Watermark

Upload Header

Upload Footer

These are NOT user-configurable assets.

They are part of the default AutoRevive template.

Keep only:

Upload Signature

Draw Signature

Type Signature

========================================================

14. REFERENCE PDF AS DESIGN SOURCE

========================================================

The supplied PDF:

Gopika L LOI.pdf

must be used as the visual source for:

- Logo placement

- Header

- Footer

- Watermark

- Colors

- Typography

- Margins

- Spacing

- Page structure

- Signature placement

- Overall branding

Do not create a completely different design.

The final PDF should visually belong to the same AutoRevive document family.

========================================================

15. DEFAULT DOCUMENT ASSETS

========================================================

Create a dedicated:

src/assets/document/

folder.

Recommended structure:

src/assets/document/

    autorevive-logo.png

    autorevive-watermark.png

    autorevive-header-assets/

    autorevive-footer-assets/

If header/footer are better implemented through CSS/React instead of image assets, use React/CSS.

IMPORTANT:

Prefer HTML/CSS for:

- Header

- Footer

- Lines

- Text

- Contact details

Use image assets only for:

- Logo

- Watermark

This ensures the generated PDF remains sharp.

========================================================

16. DO NOT USE SCREENSHOT HEADER/FOOTER

========================================================

Do NOT convert the entire PDF page into a background screenshot.

The document should be constructed using:

HTML

CSS

React

with actual text.

This is important because:

- Text must remain sharp

- PDF should be selectable

- Different candidate details must dynamically render

- Page breaks must work

- Signature must be inserted dynamically

========================================================

17. A4 DOCUMENT COMPONENT

========================================================

Create:

A4Document.tsx

It must contain:

<DocumentHeader />

<DocumentWatermark />

<DocumentContent />

<DocumentFooter />

Use the same component for:

Live Preview

Print

PDF generation

========================================================

18. DOCUMENT HEADER COMPONENT

========================================================

Create:

DocumentHeader.tsx

It must automatically render:

AutoRevive logo

Company contact details

Reference design

Decorative branding line

Do not expose upload controls.

========================================================

19. DOCUMENT FOOTER COMPONENT

========================================================

Create:

DocumentFooter.tsx

It must automatically render:

Company address

Phone

Email

Website

Use the reference document's visual arrangement.

Do not expose upload controls.

========================================================

20. WATERMARK COMPONENT

========================================================

Create:

DocumentWatermark.tsx

Use the default AutoRevive watermark asset.

Properties:

opacity

position

size

These can be hardcoded as template defaults.

Do not expose them in the normal generator UI.

========================================================

21. SIGNATURE COMPONENT

========================================================

Create:

SignaturePad.tsx

Support:

Upload

Draw

Type

Create:

SignatureSection.tsx

The final document should render:

For,

AutoRevive

[Dynamic Signature]

Jemsina Banu S

Human Resources

========================================================

22. MAIN USER EXPERIENCE

========================================================

The generator should be extremely simple.

STEP 1:

Document Type

Internship

Offer Letter

Appointment Letter

STEP 2:

Candidate/Employee Information

STEP 3:

Document-specific information

STEP 4:

Signature

Upload / Draw / Type

STEP 5:

Live A4 Preview

STEP 6:

Generate PDF

STEP 7:

Download PDF

That's it.

Do not add unnecessary configuration screens.

========================================================

23. NO DATA STORAGE

========================================================

Continue following the previous requirement:

NO backend

NO database

NO localStorage for candidate data

NO IndexedDB for candidate data

NO saved documents

NO history

All entered information remains temporary in React state.

When the page refreshes:

Candidate data disappears.

The default AutoRevive branding remains because it is part of the application code/assets.

========================================================

24. PDF QUALITY

========================================================

The final PDF must preserve:

- AutoRevive logo quality

- Header quality

- Footer quality

- Watermark quality

- Text quality

- Signature quality

Use A4:

210mm × 297mm

Do not scale the entire page into a low-resolution image.

Use HTML/CSS-based rendering wherever possible.

========================================================

25. FINAL CHECK

========================================================

Before completing the project verify:

Logo:

DEFAULT ✓

Watermark:

DEFAULT ✓

Header:

DEFAULT ✓

Footer:

DEFAULT ✓

Candidate data:

NOT SAVED ✓

Backend:

NONE ✓

Database:

NONE ✓

Signature:

UPLOADABLE ✓

Signature:

DRAWABLE ✓

Signature:

TYPEABLE ✓

Live Preview:

WORKING ✓

A4:

CORRECT ✓

Multi-page:

WORKING ✓

PDF:

DOWNLOADABLE ✓

Print:

WORKING ✓

The user should never have to upload the AutoRevive logo, watermark, header or footer.

The user should normally only provide the candidate/employee details and HR signature/e-signature.

========================================================

26. IMPORTANT FINAL INSTRUCTION

========================================================

Do not merely modify the UI.

Actually implement these changes in the existing project.

Inspect the current code first.

Remove obsolete logo/watermark/header/footer upload functionality.

Implement the default AutoRevive branding based on the supplied reference PDF.

Implement:

- Default logo

- Default watermark

- Default header

- Default footer

- Upload signature

- Draw e-signature

- Type signature

- Live A4 preview

- PDF generation

Keep the application completely frontend-only.

Run:

npm run dev

Fix all errors before finishing.


fullly humanised ui

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f18a2b6b-99f2-4057-b78b-8113f97a13b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
#   O f f e r - L e t t e r  
 