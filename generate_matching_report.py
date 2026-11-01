import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

def build_pdf(student_name="Atharv Jadhav", prn="202401100102", division="B", output_filename="EventSphere_WT_Practical_Report.pdf"):
    pdf_path = os.path.join(os.getcwd(), output_filename)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=60,
        rightMargin=60,
        topMargin=60,
        bottomMargin=60
    )

    styles = getSampleStyleSheet()

    # Academic Typography matching reference PDF
    inst_style = ParagraphStyle(
        'InstTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=18,
        alignment=1, # Center
        textColor=colors.black,
        spaceAfter=3
    )

    inst_sub = ParagraphStyle(
        'InstSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=16,
        alignment=1,
        textColor=colors.black,
        spaceAfter=30
    )

    subject_style = ParagraphStyle(
        'SubjectStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        alignment=1,
        textColor=colors.black,
        spaceAfter=6
    )

    prac_no_style = ParagraphStyle(
        'PracNoStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        alignment=1,
        textColor=colors.black,
        spaceAfter=6
    )

    prac_topic_style = ParagraphStyle(
        'PracTopicStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        alignment=1,
        textColor=colors.black,
        spaceAfter=60
    )

    project_label_style = ParagraphStyle(
        'ProjectLabel',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        alignment=1,
        textColor=colors.black,
        spaceAfter=6
    )

    project_title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=1,
        textColor=colors.black,
        spaceAfter=4
    )

    project_sub_style = ParagraphStyle(
        'ProjectSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        alignment=1,
        textColor=colors.black,
        spaceAfter=90
    )

    # Section headings matching reference (1. AIM, 2. PROBLEM STATEMENT, etc.)
    sec_heading = ParagraphStyle(
        'SecHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=16,
        textColor=colors.black,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_text = ParagraphStyle(
        'ReportBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.black,
        spaceAfter=6
    )

    bullet_text = ParagraphStyle(
        'ReportBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.black,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3
    )

    tbl_header = ParagraphStyle(
        'TblHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.black
    )

    tbl_cell = ParagraphStyle(
        'TblCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.black
    )

    fig_caption = ParagraphStyle(
        'FigCaption',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        alignment=1, # Center
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=5,
        spaceAfter=15
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("MIT ACADEMY OF ENGINEERING", inst_style))
    story.append(Paragraph("ALANDI, PUNE", inst_sub))

    story.append(Spacer(1, 25))
    story.append(Paragraph("WEB TECHNOLOGY", subject_style))
    story.append(Paragraph("PRACTICAL NO. 3", prac_no_style))
    story.append(Paragraph("FRONT-END JAVASCRIPT FRAMEWORKS: REACTJS", prac_topic_style))

    story.append(Spacer(1, 20))
    story.append(Paragraph("Project:", project_label_style))
    story.append(Paragraph("EVENTSPHERE", project_title_style))
    story.append(Paragraph("EVENT & WORKSHOP REGISTRATION PORTAL", project_sub_style))

    # Student metadata block (matching reference PDF layout)
    meta_rows = [
        [Paragraph("<b>Student Name:</b>", body_text), Paragraph(student_name, body_text)],
        [Paragraph("<b>PRN:</b>", body_text), Paragraph(prn, body_text)],
        [Paragraph("<b>Branch:</b>", body_text), Paragraph("Software Engineering", body_text)],
        [Paragraph("<b>Division:</b>", body_text), Paragraph(division, body_text)],
    ]
    student_table = Table(meta_rows, colWidths=[2.2*inch, 4.2*inch])
    student_table.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(student_table)

    story.append(Spacer(1, 120))

    # Links at bottom of cover page
    story.append(Paragraph("<b>GitHub Repository :</b> https://github.com/teamstreetup/eventsphere-react-validation", body_text))
    story.append(Paragraph("<b>Deployment Link :</b> https://teamstreetup.github.io/eventsphere-react-validation/", body_text))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: AIM, PROBLEM STATEMENT, OBJECTIVES, INTRODUCTION
    # =========================================================================
    story.append(Paragraph("1. AIM", sec_heading))
    story.append(Paragraph(
        "To design, develop and deploy a ReactJS single-page web application named EventSphere - Event & "
        "Workshop Registration Portal, demonstrating React components, state management using hooks, event "
        "handling, client-side form validation, error and success messages, interactive application management, "
        "dynamic pricing calculation, and browser-side data persistence.",
        body_text
    ))

    story.append(Paragraph("2. PROBLEM STATEMENT", sec_heading))
    story.append(Paragraph(
        "The practical requires an individual front-end web application developed using ReactJS. The "
        "application must demonstrate client-side validation and interactive functionality, use React "
        "concepts such as components, state and event handling, display suitable error messages, provide "
        "success or confirmation feedback, offer a user-friendly interface, and be tested with valid and "
        "invalid inputs. The completed application must also be deployed and submitted through a public link.",
        body_text
    ))
    story.append(Paragraph(
        "EventSphere addresses these requirements through a multi-step conference and workshop registration portal. "
        "A user can enter personal details, academic profile, select ticket tiers and workshop tracks, apply promotional "
        "coupons with live discount calculation, inspect real-time password security criteria, and validate details before "
        "submission. Field-level error messages appear when inputs are invalid, and a verified digital attendee pass with "
        "celebratory confetti is generated upon successful submission. Registered attendees are displayed in an interactive "
        "directory with search and filter capabilities, and are persisted in browser localStorage so they remain available after a "
        "refresh in the same browser.",
        body_text
    ))

    story.append(Paragraph("3. OBJECTIVES", sec_heading))
    story.append(Paragraph("&bull; Develop an individual ReactJS application using a component-based structure.", bullet_text))
    story.append(Paragraph("&bull; Use React state (useState) to manage form values, validation errors, step progression, and attendee records.", bullet_text))
    story.append(Paragraph("&bull; Use React useMemo for real-time subtotal, add-on workshop costs, and promotional discount calculations.", bullet_text))
    story.append(Paragraph("&bull; Implement controlled form inputs and event handlers for user interaction.", bullet_text))
    story.append(Paragraph("&bull; Validate name, email, Indian mobile number, date of birth (enforcing age &ge; 18), institution, portfolio URL, and statement of purpose (30 to 300 characters).", bullet_text))
    story.append(Paragraph("&bull; Validate pass tier selection, workshop multi-select group (between 1 and 3 tracks), 5-factor password strength, password matching, and mandatory terms acceptance.", bullet_text))
    story.append(Paragraph("&bull; Display field-level validation errors and overall step error banners with animated visual feedback.", bullet_text))
    story.append(Paragraph("&bull; Allow users to submit valid registrations and view the confirmed attendee directory dynamically.", bullet_text))
    story.append(Paragraph("&bull; Provide interactive confirmation with celebratory confetti and a printable digital attendee badge with QR code.", bullet_text))
    story.append(Paragraph("&bull; Persist confirmed attendee records in browser localStorage using JSON conversion.", bullet_text))
    story.append(Paragraph("&bull; Create a responsive, accessible user-friendly interface for desktop, tablet, and mobile screens.", bullet_text))
    story.append(Paragraph("&bull; Build and deploy the production application using Vite and GitHub Pages.", bullet_text))

    story.append(Paragraph("4. INTRODUCTION", sec_heading))
    story.append(Paragraph(
        "ReactJS is a JavaScript library used to build interactive user interfaces. It organizes an interface "
        "into reusable components and updates the rendered page when application state changes. React "
        "state and event handlers allow a web application to respond to user input without manually "
        "rebuilding the entire page.",
        body_text
    ))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: INTRO CONTD & TECHNOLOGIES USED
    # =========================================================================
    story.append(Paragraph(
        "EventSphere - Event & Workshop Registration Portal is a single-page front-end application created for "
        "Web Technology Practical 3. It provides a multi-step form for entering applicant information, selecting an "
        "academic track and institution, selecting ticket tiers and workshop tracks, calculating real-time pricing and "
        "promo discounts, and establishing secure credentials. The application validates the entered data before accepting "
        "it and presents immediate visual feedback when the form is incomplete or invalid.",
        body_text
    ))
    story.append(Paragraph(
        "The application uses React useState for state management, useMemo for reactive price recalculations, and "
        "useEffect for synchronizing theme preferences and application records with localStorage. Vite is used as the "
        "development and production build tool. The project is hosted in a public GitHub repository and deployed to GitHub Pages.",
        body_text
    ))

    story.append(Paragraph("5. TECHNOLOGIES USED", sec_heading))

    tech_rows = [
        [Paragraph("Technology", tbl_header), Paragraph("Purpose", tbl_header)],
        [Paragraph("ReactJS", tbl_cell), Paragraph("Component-based user interface and declarative virtual DOM rendering.", tbl_cell)],
        [Paragraph("JavaScript (ES6+)", tbl_cell), Paragraph("Validation logic, event callbacks, object and array operations, regex, temporal age math.", tbl_cell)],
        [Paragraph("useState", tbl_cell), Paragraph("Manages form data, touched fields, errors, current step, and modal visibility.", tbl_cell)],
        [Paragraph("useMemo", tbl_cell), Paragraph("Computes reactive live pricing, workshop add-ons, and promo code discounts.", tbl_cell)],
        [Paragraph("useEffect", tbl_cell), Paragraph("Synchronizes dark/light theme and persists attendee records to browser localStorage.", tbl_cell)],
        [Paragraph("HTML5 / JSX", tbl_cell), Paragraph("Defines the interface structure using JSX syntax and accessible ARIA attributes.", tbl_cell)],
        [Paragraph("CSS3", tbl_cell), Paragraph("Custom visual styling, layout, CSS variables, dark/light themes, animations, and print stylesheets.", tbl_cell)],
        [Paragraph("Lucide React", tbl_cell), Paragraph("Accessible modern iconography for form fields, alerts, and step indicators.", tbl_cell)],
        [Paragraph("Canvas-Confetti", tbl_cell), Paragraph("Celebratory particle animation triggered upon valid registration submission.", tbl_cell)],
        [Paragraph("Vite", tbl_cell), Paragraph("Development server and optimized production build tool.", tbl_cell)],
        [Paragraph("npm", tbl_cell), Paragraph("Installs project dependencies and runs build/lint/test scripts.", tbl_cell)],
        [Paragraph("localStorage / JSON", tbl_cell), Paragraph("Browser-side persistence of confirmed attendee registration records.", tbl_cell)],
        [Paragraph("VS Code / Web Browser", tbl_cell), Paragraph("Development, editing, testing and demonstration environment.", tbl_cell)],
        [Paragraph("Git / GitHub", tbl_cell), Paragraph("Version control and public source-code hosting.", tbl_cell)],
        [Paragraph("GitHub Pages", tbl_cell), Paragraph("Automated production build and public static-site deployment.", tbl_cell)],
    ]

    tech_table = Table(tech_rows, colWidths=[2.2*inch, 4.4*inch])
    tech_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,0), 1, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(tech_table)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: CLIENT-SIDE VALIDATION & TESTING T1 TO T7
    # =========================================================================
    story.append(Paragraph("6. CLIENT-SIDE VALIDATION", sec_heading))

    val_rows = [
        [Paragraph("Field", tbl_header), Paragraph("Validation rule", tbl_header), Paragraph("Example of invalid input", tbl_header)],
        [Paragraph("Full name", tbl_cell), Paragraph("Trimmed name must contain at least 3 alphabetic characters.", tbl_cell), Paragraph("Blank, 'Ab', or containing digits (e.g. 'Aarav12').", tbl_cell)],
        [Paragraph("Email", tbl_cell), Paragraph("Must match valid RFC email pattern user@domain.tld with typo detection.", tbl_cell), Paragraph("name@, missing top-level domain, or user@gmai.com.", tbl_cell)],
        [Paragraph("Mobile number", tbl_cell), Paragraph("10-digit Indian mobile pattern beginning with 6-9.", tbl_cell), Paragraph("12345, letters, or starts with 0-5.", tbl_cell)],
        [Paragraph("Date of Birth", tbl_cell), Paragraph("Temporal date math; attendee must be at least 18 years old and not in the future.", tbl_cell), Paragraph("Future date, or minor under 18 (e.g. 2020-05-10).", tbl_cell)],
        [Paragraph("Institution", tbl_cell), Paragraph("College or organization name must contain at least 3 characters.", tbl_cell), Paragraph("Blank or short string (e.g. 'AB').", tbl_cell)],
        [Paragraph("Portfolio URL", tbl_cell), Paragraph("Optional; if supplied, must be valid HTTP or HTTPS URL.", tbl_cell), Paragraph("ftp://link or domain without protocol.", tbl_cell)],
        [Paragraph("Statement / Bio", tbl_cell), Paragraph("Must contain between 30 and 300 characters.", tbl_cell), Paragraph("Under 30 chars (e.g. 'Too short') or > 300 chars.", tbl_cell)],
        [Paragraph("Workshops", tbl_cell), Paragraph("Must select between 1 and 3 workshop tracks.", tbl_cell), Paragraph("0 selected, or > 3 workshops chosen.", tbl_cell)],
        [Paragraph("Password", tbl_cell), Paragraph("Must contain 8+ chars, uppercase, lowercase, number, and special character.", tbl_cell), Paragraph("Short password ('pass') or missing symbol.", tbl_cell)],
        [Paragraph("Confirm password", tbl_cell), Paragraph("Must match primary password character-by-character.", tbl_cell), Paragraph("Mismatch with primary password.", tbl_cell)],
        [Paragraph("Terms & conduct", tbl_cell), Paragraph("Checkbox must be checked before submission.", tbl_cell), Paragraph("Unchecked terms agreement checkbox.", tbl_cell)],
    ]

    val_table = Table(val_rows, colWidths=[1.4*inch, 2.7*inch, 2.5*inch])
    val_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,0), 1, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(val_table)

    story.append(Paragraph("7. TESTING AND VALIDATION (T1 to T14)", sec_heading))

    test_rows_part1 = [
        [Paragraph("Test", tbl_header), Paragraph("Input / Action", tbl_header), Paragraph("Expected Result", tbl_header), Paragraph("Observed Result", tbl_header)],
        [Paragraph("T1", tbl_cell), Paragraph("Submit all fields empty.", tbl_cell), Paragraph("Required-field messages appear; no record is added.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T2", tbl_cell), Paragraph("Enter a very short name.", tbl_cell), Paragraph("Name validation message appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T3", tbl_cell), Paragraph("Enter an invalid email address.", tbl_cell), Paragraph("Email validation message appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T4", tbl_cell), Paragraph("Enter an invalid mobile number.", tbl_cell), Paragraph("Mobile validation message appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T5", tbl_cell), Paragraph("Enter date of birth for minor (<18).", tbl_cell), Paragraph("Age boundary validation message appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T6", tbl_cell), Paragraph("Leave college / organization empty.", tbl_cell), Paragraph("Institution validation appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T7", tbl_cell), Paragraph("Enter valid details and submit.", tbl_cell), Paragraph("Registration added, confetti and digital pass modal appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
    ]

    test_table_1 = Table(test_rows_part1, colWidths=[0.6*inch, 2.2*inch, 2.5*inch, 1.3*inch])
    test_table_1.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,0), 1, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(test_table_1)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 5: TESTING CONTD (T8 to T14)
    # =========================================================================
    test_rows_part2 = [
        [Paragraph("Test", tbl_header), Paragraph("Input / Action", tbl_header), Paragraph("Expected Result", tbl_header), Paragraph("Observed Result", tbl_header)],
        [Paragraph("T8", tbl_cell), Paragraph("Leave portfolio URL blank.", tbl_cell), Paragraph("Allowed if other fields are valid.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T9", tbl_cell), Paragraph("Enter an invalid portfolio URL.", tbl_cell), Paragraph("URL protocol validation appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T10", tbl_cell), Paragraph("Refresh after a successful submission.", tbl_cell), Paragraph("Saved registrations remain in browser localStorage.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T11", tbl_cell), Paragraph("Filter attendees by pass tier.", tbl_cell), Paragraph("Table updates dynamically to matching tier.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T12", tbl_cell), Paragraph("Clear and reset the form.", tbl_cell), Paragraph("Form fields reset to default.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T13", tbl_cell), Paragraph("Delete all records.", tbl_cell), Paragraph("Empty-state message appears.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
        [Paragraph("T14", tbl_cell), Paragraph("Open at mobile viewport width.", tbl_cell), Paragraph("Layout remains readable without horizontal overflow.", tbl_cell), Paragraph("PASS (Verified)", tbl_cell)],
    ]

    test_table_2 = Table(test_rows_part2, colWidths=[0.6*inch, 2.2*inch, 2.5*inch, 1.3*inch])
    test_table_2.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,0), 1, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(test_table_2)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 6: SCREENSHOTS (FIGURE 1 & FIGURE 2)
    # =========================================================================
    story.append(Paragraph("8. SCREENSHOTS", sec_heading))

    fig1_img = os.path.join(os.getcwd(), 'fig1_landing.png')
    if os.path.exists(fig1_img):
        story.append(Image(fig1_img, width=6.5*inch, height=3.6*inch))
        story.append(Paragraph("Figure 1: EventSphere desktop landing interface with application form and activity list.", fig_caption))

    story.append(Spacer(1, 10))

    fig2_img = os.path.join(os.getcwd(), 'fig2_validation_errors.png')
    if os.path.exists(fig2_img):
        story.append(Image(fig2_img, width=6.5*inch, height=3.6*inch))
        story.append(Paragraph("Figure 2: Real-time client-side validation error messages and highlights for incomplete input.", fig_caption))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 7: SCREENSHOT (FIGURE 3)
    # =========================================================================
    fig3_img = os.path.join(os.getcwd(), 'fig3_success_pass.png')
    if os.path.exists(fig3_img):
        story.append(Spacer(1, 40))
        story.append(Image(fig3_img, width=6.5*inch, height=5.2*inch))
        story.append(Paragraph("Figure 3: Success state, toast notification, and dynamically rendered digital pass.", fig_caption))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 8: SCREENSHOT (FIGURE 4)
    # =========================================================================
    fig4_img = os.path.join(os.getcwd(), 'fig4_attendees_list.png')
    if os.path.exists(fig4_img):
        story.append(Spacer(1, 40))
        story.append(Image(fig4_img, width=6.5*inch, height=5.2*inch))
        story.append(Paragraph("Figure 4: Confirmed Attendees Directory with real-time search and tier filtering.", fig_caption))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 9: SCREENSHOT (FIGURE 5) & CONCLUSION
    # =========================================================================
    fig5_img = os.path.join(os.getcwd(), 'fig5_validation_guide.png')
    if os.path.exists(fig5_img):
        story.append(Spacer(1, 10))
        story.append(Image(fig5_img, width=6.5*inch, height=4.6*inch))
        story.append(Paragraph("Figure 5: In-app Validation Architecture Guide and rules reference.", fig_caption))

    story.append(Spacer(1, 15))
    story.append(Paragraph("9. CONCLUSION", sec_heading))
    story.append(Paragraph(
        "The EventSphere project demonstrates the development of a ReactJS front-end application using "
        "JSX, React state, event handling, client-side validation and dynamic rendering. The form "
        "validates applicant details before accepting a record, displays useful error feedback for invalid "
        "input, and confirms successful submission. Application records are displayed interactively and "
        "persisted in localStorage for the same browser.",
        body_text
    ))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 10: CONCLUSION CONTD
    # =========================================================================
    story.append(Spacer(1, 30))
    story.append(Paragraph(
        "The project also demonstrates a Vite production build, source-code management through Git and "
        "GitHub, and automated deployment through GitHub Actions to GitHub Pages.",
        body_text
    ))

    doc.build(story)
    print(f"Successfully generated matching report: {pdf_path}")

if __name__ == '__main__':
    # 1. Report for Atharv Jadhav
    build_pdf(
        student_name="Atharv Jadhav",
        prn="202401100102",
        division="B",
        output_filename="EventSphere_WT_Practical_Report.pdf"
    )
    # 2. Report for Chaitanya Umbarkar
    build_pdf(
        student_name="Chaitanya Umbarkar",
        prn="202401100080",
        division="B",
        output_filename="EventSphere_WT_Practical_Report_Chaitanya_Umbarkar.pdf"
    )
