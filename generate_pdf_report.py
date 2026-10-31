import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and print total page numbers (e.g. Page 1 of 4).
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))

        # Running header on subsequent pages
        if self._pageNumber > 1:
            self.drawString(54, 755, "Web Technology (WT) Lab Assignment | ReactJS Client-Side Validation")
            self.drawRightString(558, 755, "EventSphere 2026")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, 748, 558, 748)

        # Footer on all pages
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawString(54, 35, "Submitted for Academic Evaluation | Bachelor of Engineering / Technology (WT Lab)")
        self.drawRightString(558, 35, page_str)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 46, 558, 46)
        self.restoreState()

def build_pdf():
    pdf_path = os.path.join(os.getcwd(), "WT_ReactJS_Validation_Assignment_Report.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom typography & styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0f172a'),
        alignment=0,
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#2563eb'),
        spaceAfter=8
    )

    h1_style = ParagraphStyle(
        'CustomH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#1e3a8a'),
        spaceBefore=12,
        spaceAfter=5,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'CustomH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3.5
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#0f172a')
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#0f172a')
    )

    meta_label = ParagraphStyle('MetaLabel', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.HexColor('#334155'))
    meta_val = ParagraphStyle('MetaVal', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, textColor=colors.HexColor('#0f172a'))

    story = []

    # =========================================================================
    # PAGE 1: TITLE, METADATA, PROBLEM STATEMENT & DOMAIN ARCHITECTURE
    # =========================================================================
    story.append(Paragraph("LABORATORY PRACTICAL REPORT & SUBMISSION", subtitle_style))
    story.append(Paragraph("Design, Development & Deployment of a ReactJS Web Application Demonstrating Client-Side Validation and Interactive UX", title_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563eb'), spaceBefore=2, spaceAfter=8))

    # Meta Table: Student & Submission Details
    meta_data = [
        [Paragraph("Course / Subject:", meta_label), Paragraph("Web Technology (WT) Lab", meta_val),
         Paragraph("Academic Year:", meta_label), Paragraph("3rd Year Engineering (2025-2026)", meta_val)],
        [Paragraph("Project Name:", meta_label), Paragraph("EventSphere 2026 Summit Portal", meta_val),
         Paragraph("Technology Stack:", meta_label), Paragraph("ReactJS 19, Vite 8, Modern CSS3", meta_val)],
        [Paragraph("Live Web URL:", meta_label), Paragraph('<font color="#2563eb"><u>https://teamstreetup.github.io/eventsphere-react-validation/</u></font>', meta_val),
         Paragraph("Deployment Host:", meta_label), Paragraph("GitHub Pages (Continuous Deployment)", meta_val)],
        [Paragraph("GitHub Repository:", meta_label), Paragraph('<font color="#2563eb"><u>https://github.com/teamstreetup/eventsphere-react-validation</u></font>', meta_val),
         Paragraph("Automated Tests:", meta_label), Paragraph('<font color="#059669"><b>42 / 42 Tests Passed (100% Pass)</b></font>', meta_val)],
    ]

    meta_table = Table(meta_data, colWidths=[1.2*inch, 2.3*inch, 1.2*inch, 2.3*inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # Section 1: Problem Statement & Objectives
    story.append(Paragraph("1. Problem Statement & Assignment Objectives", h1_style))
    story.append(Paragraph(
        "The objective of this assignment is to design, develop, test, and deploy an individual web application using "
        "<b>ReactJS</b> that accepts structured user input, performs thorough <b>client-side validation</b>, displays intuitive "
        "and accessible error feedback, provides positive confirmation messaging upon valid entry, and offers an engaging, "
        "interactive user experience. The application must model a real-world scenario and be published live on the web.",
        body_style
    ))

    # Section 2: Real-World Application Theme: EventSphere 2026
    story.append(Paragraph("2. Selected Real-World Domain: EventSphere 2026 Summit Portal", h1_style))
    story.append(Paragraph(
        "To satisfy the real-world requirement, <b>EventSphere 2026</b> was conceived as a high-performance developer conference "
        "and hands-on workshop registration portal. It captures diverse input types across four progressive stages:",
        body_style
    ))
    story.append(Paragraph("&bull; <b>Step 1: Personal Identification:</b> Full legal name, verified email, 10-digit mobile number, date of birth (enforcing an age constraint &gt;= 18), and gender identity.", bullet_style))
    story.append(Paragraph("&bull; <b>Step 2: Academic & Professional Profile:</b> College/organization affiliation, professional role, technical track specialization, optional portfolio/GitHub URL, and a statement of purpose with real-time character boundary monitoring (30 to 300 characters).", bullet_style))
    story.append(Paragraph("&bull; <b>Step 3: Access Pass & Workshop Tracks:</b> Pass tier selection (Student, Developer, VIP), hands-on workshop selection (minimum 1, maximum 3), apparel sizing, dietary preferences, and dynamic coupon discount engine.", bullet_style))
    story.append(Paragraph("&bull; <b>Step 4: Account Security & Final Confirmation:</b> 5-point password strength verification, character-by-character password confirmation, terms of service acceptance, and registration review summary.", bullet_style))

    # Clean PageBreak for Page 2
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: FORM VALIDATION ARCHITECTURE & COMPLETE RULE MATRIX
    # =========================================================================
    story.append(Paragraph("3. Form Validation Architecture & Rule Matrix", h1_style))
    story.append(Paragraph(
        "The application utilizes pure JavaScript validator functions decoupled from the view layer (`src/utils/validation.js`), "
        "enabling instantaneous UI feedback during keystroke (`onChange`) and element departure (`onBlur`) events without premature user fatigue.",
        body_style
    ))

    val_data = [
        [Paragraph("Input Field", table_header_style),
         Paragraph("Validation Technique & Criteria", table_header_style),
         Paragraph("Error Trigger & Message", table_header_style),
         Paragraph("Valid State Indicator", table_header_style)],

        [Paragraph("<b>Full Name</b>", table_cell_style),
         Paragraph("Regex: <code>^[A-Za-z]+([ A-Za-z'-]+)*$</code><br/>Length: 3 to 50 chars", table_cell_style),
         Paragraph("&bull; &lt; 3 characters<br/>&bull; Contains digits or symbols", table_cell_style),
         Paragraph("Green checkmark + border", table_cell_style)],

        [Paragraph("<b>Email Address</b>", table_cell_style),
         Paragraph("RFC 5322 regex pattern + Domain typo heuristic (@gmai.com, @yaho.com)", table_cell_style),
         Paragraph("&bull; Missing '@' or top-level domain<br/>&bull; Suggests typo correction", table_cell_style),
         Paragraph("Verified domain pattern", table_cell_style)],

        [Paragraph("<b>Mobile Number</b>", table_cell_style),
         Paragraph("Regex: <code>^[6-9]\\d{9}$</code><br/>Exact 10 digits starting with 6,7,8,9", table_cell_style),
         Paragraph("&bull; Length != 10 digits<br/>&bull; Invalid prefix or non-numeric", table_cell_style),
         Paragraph("Valid telecom format", table_cell_style)],

        [Paragraph("<b>Date of Birth</b>", table_cell_style),
         Paragraph("Temporal math: Age = (Today - DOB) &gt;= 18<br/>Rejects future & unrealistic dates", table_cell_style),
         Paragraph("&bull; Age &lt; 18 years old<br/>&bull; Date in the future", table_cell_style),
         Paragraph("Age threshold confirmed", table_cell_style)],

        [Paragraph("<b>Institution</b>", table_cell_style),
         Paragraph("Required string; trimmed length &gt;= 3 chars", table_cell_style),
         Paragraph("&bull; Empty or whitespace only<br/>&bull; Length &lt; 3 chars", table_cell_style),
         Paragraph("Affiliation recorded", table_cell_style)],

        [Paragraph("<b>Portfolio URL</b>", table_cell_style),
         Paragraph("Optional; if entered: requires <code>http://</code> or <code>https://</code> with valid domain syntax", table_cell_style),
         Paragraph("&bull; Malformed URL syntax<br/>&bull; Missing protocol header", table_cell_style),
         Paragraph("Clean link format", table_cell_style)],

        [Paragraph("<b>Bio / SOP</b>", table_cell_style),
         Paragraph("Real-time string length bounds: Min 30 chars, Max 300 chars", table_cell_style),
         Paragraph("&bull; Length &lt; 30 chars<br/>&bull; Length &gt; 300 chars", table_cell_style),
         Paragraph("Counter color-coded green", table_cell_style)],

        [Paragraph("<b>Workshops</b>", table_cell_style),
         Paragraph("Checkbox array cardinality: 1 &lt;= selected &lt;= 3", table_cell_style),
         Paragraph("&bull; 0 workshops selected<br/>&bull; &gt; 3 workshops chosen", table_cell_style),
         Paragraph("Valid schedule selection", table_cell_style)],

        [Paragraph("<b>Password</b>", table_cell_style),
         Paragraph("5-factor criteria: 8+ chars, uppercase, lowercase, number, special character", table_cell_style),
         Paragraph("&bull; Fewer than 8 chars<br/>&bull; Strength score &lt; 4 out of 5", table_cell_style),
         Paragraph("Dynamic green strength meter", table_cell_style)],

        [Paragraph("<b>Confirm Pass</b>", table_cell_style),
         Paragraph("Strict equality check: <code>confirmPassword === password</code>", table_cell_style),
         Paragraph("&bull; Password mismatch detected", table_cell_style),
         Paragraph("Exact character match", table_cell_style)],

        [Paragraph("<b>Terms Check</b>", table_cell_style),
         Paragraph("Boolean truth evaluation: <code>agreeTerms === true</code>", table_cell_style),
         Paragraph("&bull; Checkbox unchecked on submit", table_cell_style),
         Paragraph("Legally acknowledged", table_cell_style)],
    ]

    val_table = Table(val_data, colWidths=[1.1*inch, 2.3*inch, 2.1*inch, 1.5*inch])
    val_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e3a8a')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(val_table)

    # Clean PageBreak for Page 3
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: INTERACTIVE FEATURES & AUTOMATED TEST RESULTS
    # =========================================================================
    story.append(Paragraph("4. Interactive Features & State Management Architecture", h1_style))
    story.append(Paragraph(
        "EventSphere 2026 goes beyond static forms by offering several sophisticated reactive features powered by React hooks:",
        body_style
    ))

    story.append(Paragraph("&bull; <b>Progressive Multi-Step Disclosure with Validation Gating:</b> The user progresses through 4 logically segmented views. Progression to the subsequent step is strictly gated; attempting to proceed with invalid inputs immediately focuses the affected fields, marks them as touched, and displays animated error banners.", bullet_style))
    story.append(Paragraph("&bull; <b>Reactive Live Price Engine:</b> Dynamic pricing is computed via React's <code>useMemo</code> hook. The pricing formula computes: <code>Total = PassPrice + ExtraWorkshopFees - Discount</code>. Workshop fees are dynamically waived when the VIP Pass is chosen, demonstrating dynamic business rules.", bullet_style))
    story.append(Paragraph("&bull; <b>Instant Coupon Code Verification:</b> Users can test coupon codes (<code>STUDENT50</code>: 50% discount, <code>EARLYBIRD</code>: 25% discount, <code>DEVCON</code>: flat Rs. 300 off) with instantaneous subtotal adjustments or shake alerts for invalid codes.", bullet_style))
    story.append(Paragraph("&bull; <b>Password Strength Inspector:</b> Evaluates passwords across 5 criteria in real-time, providing immediate visual confirmation via an animated progress bar that transitions from Red (Weak) to Orange, Amber, and Green (Strong).", bullet_style))
    story.append(Paragraph("&bull; <b>Local Persistence & Directory:</b> Completed registrations persist inside the browser's <code>localStorage</code>, populating a searchable and filterable Attendee Directory with real-time revenue analytics and JSON export capabilities.", bullet_style))
    story.append(Paragraph("&bull; <b>Digital Pass Generation & Confetti:</b> On valid form submission, a celebratory particle burst is triggered using <code>canvas-confetti</code>, and an interactive Digital Event Pass is rendered complete with a simulated check-in QR code, badge ID, and print stylesheet.", bullet_style))
    story.append(Paragraph("&bull; <b>Examiner Demonstration Sandbox:</b> The interface includes 'Fill Valid Data' and 'Test Error States' buttons, allowing evaluators to immediately verify both success and failure flows with a single click.", bullet_style))

    story.append(Spacer(1, 6))

    # Section 5: Automated Testing & Verification
    story.append(Paragraph("5. Verification & Test Execution Results", h1_style))
    story.append(Paragraph(
        "To rigorously verify client-side validation accuracy across edge cases, an automated test runner (`test-validation.js`) "
        "was executed using Node.js. All 42 unit test assertions passed with zero defects:",
        body_style
    ))

    test_data = [
        [Paragraph("Test Module", table_header_style),
         Paragraph("Test Scenarios Evaluated", table_header_style),
         Paragraph("Sample Test Inputs", table_header_style),
         Paragraph("Outcome", table_header_style)],

        [Paragraph("<b>Full Name</b>", table_cell_style),
         Paragraph("Min length, empty string, symbols, numbers, valid hyphens", table_cell_style),
         Paragraph("<code>'Aarav Sharma'</code> (Pass), <code>'Jo'</code> (Fail), <code>'Aarav123'</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>5 / 5 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Email</b>", table_cell_style),
         Paragraph("RFC compliance, subdomain support, common typo heuristic", table_cell_style),
         Paragraph("<code>'student@college.edu'</code> (Pass), <code>'user@gmai.com'</code> (Typo flagged)", table_cell_style),
         Paragraph("<font color='#059669'><b>6 / 6 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Phone</b>", table_cell_style),
         Paragraph("Length boundary (9, 10, 11), numeric filter, prefix check", table_cell_style),
         Paragraph("<code>'9876543210'</code> (Pass), <code>'1234567890'</code> (Fail), <code>'98765'</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>6 / 6 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Age / DOB</b>", table_cell_style),
         Paragraph("Adult age &gt;= 18, minor boundary (&lt; 18), future dates", table_cell_style),
         Paragraph("<code>'2000-01-15'</code> (Pass), <code>'2020-05-10'</code> (Fail), <code>'2030-01-01'</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>4 / 4 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Institution</b>", table_cell_style),
         Paragraph("String length check, whitespace trimming, empty rejection", table_cell_style),
         Paragraph("<code>'Maharashtra Institute of Tech'</code> (Pass), <code>'AB'</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>3 / 3 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Bio / SOP</b>", table_cell_style),
         Paragraph("Underflow boundary (&lt; 30 chars), valid length (30-300)", table_cell_style),
         Paragraph("<code>'Passionate computer engineering student...'</code> (Pass), <code>'Short'</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>3 / 3 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Workshops</b>", table_cell_style),
         Paragraph("Cardinality limits: empty array, 1 track, 3 tracks, 4 tracks", table_cell_style),
         Paragraph("<code>['ws1']</code> (Pass), <code>[]</code> (Fail), <code>['ws1'..'ws4']</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>4 / 4 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Password</b>", table_cell_style),
         Paragraph("5-factor complexity scoring, length &gt;= 8, regex checks", table_cell_style),
         Paragraph("<code>'SecurePass@2026'</code> (Score 5/5), <code>'123'</code> (Score 1/5)", table_cell_style),
         Paragraph("<font color='#059669'><b>5 / 5 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Confirm Pass</b>", table_cell_style),
         Paragraph("Identical match versus intentional typo mismatch", table_cell_style),
         Paragraph("<code>'Match@123' == 'Match@123'</code> (Pass), <code>'Mis' != 'Match'</code> (Fail)", table_cell_style),
         Paragraph("<font color='#059669'><b>2 / 2 Passed</b></font>", table_cell_style)],

        [Paragraph("<b>Full Form</b>", table_cell_style),
         Paragraph("End-to-end integration test of valid attendee vs invalid state", table_cell_style),
         Paragraph("<code>validateAll(SAMPLE_VALID_USER)</code> &rarr; <code>isValid: true</code>", table_cell_style),
         Paragraph("<font color='#059669'><b>4 / 4 Passed</b></font>", table_cell_style)],
    ]

    test_table = Table(test_data, colWidths=[1.1*inch, 2.2*inch, 2.5*inch, 1.2*inch])
    test_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e3a8a')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(test_table)

    # Clean PageBreak for Page 4
    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: PROJECT STRUCTURE, VIVA Q&A & CONCLUSION / SIGNATURES
    # =========================================================================
    story.append(Paragraph("6. Project Structure & Code Architecture", h1_style))
    story.append(Paragraph(
        "The project follows a clean separation of concerns, ensuring maximum readability, testability, and maintainability:",
        body_style
    ))

    struct_cell_style = ParagraphStyle(
        'StructCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.8,
        leading=8.5,
        textColor=colors.HexColor('#0f172a')
    )

    struct_code_style = ParagraphStyle(
        'StructCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=6.8,
        leading=8.5,
        textColor=colors.HexColor('#0f172a')
    )

    code_struct = [
        [Paragraph("Directory / File", table_header_style), Paragraph("Responsibility & Implementation Details", table_header_style)],
        [Paragraph("<code>src/App.jsx</code>", struct_code_style), Paragraph("Main orchestrator; manages multi-step state, active navigation tabs, dynamic pricing memoization, and submission handlers.", struct_cell_style)],
        [Paragraph("<code>src/utils/validation.js</code>", struct_code_style), Paragraph("Pure validation library containing regex patterns, age calculations, password scoring algorithms, and step/all validation gates.", struct_cell_style)],
        [Paragraph("<code>src/utils/constants.js</code>", struct_code_style), Paragraph("Application data models: pass tiers, workshop tracks, coupon dictionaries, and preset evaluation personas.", struct_cell_style)],
        [Paragraph("<code>src/components/FormField.jsx</code>", struct_code_style), Paragraph("Reusable form field wrapper managing labels, asterisks, aria alerts, inline error icons, and success states.", struct_cell_style)],
        [Paragraph("<code>src/components/StepOnePersonal.jsx</code>", struct_code_style), Paragraph("Step 1 component: Full Name, RFC Email, 10-Digit Mobile, Age 18+ Date of Birth, and Gender.", struct_cell_style)],
        [Paragraph("<code>src/components/StepTwoProfile.jsx</code>", struct_code_style), Paragraph("Step 2 component: College/Company, Track selector, Portfolio URL validation, and 30-300 char counter Bio.", struct_cell_style)],
        [Paragraph("<code>src/components/StepThreeTickets.jsx</code>", struct_code_style), Paragraph("Step 3 component: Pass cards, workshop checkbox group (min 1, max 3), and reactive coupon price engine.", struct_cell_style)],
        [Paragraph("<code>src/components/StepFourSecurity.jsx</code>", struct_code_style), Paragraph("Step 4 component: 5-point password strength bar, show/hide toggle, password confirmation, and terms checkbox.", struct_cell_style)],
        [Paragraph("<code>src/components/RegistrationSummaryModal.jsx</code>", struct_code_style), Paragraph("Confirmation dialog: triggers confetti animation, renders digital event badge with QR code, and print styling.", struct_cell_style)],
        [Paragraph("<code>src/components/AttendeesList.jsx</code>", struct_code_style), Paragraph("Tab 2 view: LocalStorage attendee table with real-time text search, pass-tier filtering, and JSON export.", struct_cell_style)],
        [Paragraph("<code>src/components/ValidationGuide.jsx</code>", struct_code_style), Paragraph("Tab 3 view: In-app technical reference guide displaying all regex formulas and validation criteria.", struct_cell_style)],
        [Paragraph("<code>test-validation.js</code>", struct_code_style), Paragraph("Automated unit testing script verifying 42 assertions using Node.js.", struct_cell_style)],
    ]

    struct_table = Table(code_struct, colWidths=[2.2*inch, 4.8*inch])
    struct_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#334155')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('TOPPADDING', (0,0), (-1,-1), 1.2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.2),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(struct_table)

    story.append(Spacer(1, 4))

    # Section 7: Viva Preparation Q&A
    story.append(Paragraph("7. Viva Voce Technical Questions & Model Answers", h1_style))
    story.append(Paragraph("<b>Q1: Why is client-side validation crucial, and can it replace server-side validation?</b>", h2_style))
    story.append(Paragraph(
        "<b>Answer:</b> Client-side validation delivers instant feedback to the user, catches syntax/boundary errors without network latency, "
        "and conserves server resources. However, it <i>cannot</i> replace server-side validation because client-side code can be bypassed "
        "by disabling JavaScript or crafting direct HTTP API calls via tools like Postman or cURL. Defense-in-depth requires validation on both layers.",
        body_style
    ))

    story.append(Paragraph("<b>Q2: How does the application avoid intimidating users with premature error messages?</b>", h2_style))
    story.append(Paragraph(
        "<b>Answer:</b> We implemented a two-fold state strategy using `errors` and `touched` dictionaries. Error messages are only rendered "
        "if <code>touched[fieldName] === true</code>. This ensures that pristine fields do not display glaring red errors before the user has "
        "even clicked or typed in them.",
        body_style
    ))

    story.append(Paragraph("<b>Q3: What role does <code>useMemo</code> play in the pricing calculation?</b>", h2_style))
    story.append(Paragraph(
        "<b>Answer:</b> <code>useMemo</code> memoizes the calculated subtotal, workshop fees, and applied discount, only re-evaluating when "
        "its dependencies (<code>passTier</code>, <code>selectedWorkshops</code>, <code>promoCode</code>) change. This prevents expensive "
        "recalculations on unrelated state changes such as typing in text inputs.",
        body_style
    ))

    # Section 8: Conclusion & Declaration
    story.append(Spacer(1, 2))
    story.append(Paragraph("8. Conclusion & Academic Declaration", h1_style))
    story.append(Paragraph(
        "The web application <b>EventSphere 2026</b> successfully fulfills all requirements set forth in the Web Technology laboratory assignment. "
        "It demonstrates client-side form validation across diverse data types, provides meaningful error and success notifications, "
        "features an interactive and responsive user interface, has been thoroughly verified with 42 automated test cases, and is accessible live on GitHub Pages.",
        body_style
    ))

    story.append(Spacer(1, 4))

    # Signature Block
    sig_data = [
        [Paragraph("<b>Student Signature:</b> ___________________________", body_style),
         Paragraph("<b>Date of Submission:</b> October 31, 2026", body_style)],
        [Paragraph("<b>Evaluator / Faculty Signature:</b> ___________________________", body_style),
         Paragraph("<b>Marks / Grade Awarded:</b> _________ / _________", body_style)]
    ]
    sig_table = Table(sig_data, colWidths=[3.5*inch, 3.5*inch])
    sig_table.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(KeepTogether(sig_table))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF report: {pdf_path}")

if __name__ == '__main__':
    build_pdf()
