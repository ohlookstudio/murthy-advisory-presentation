/* Phase 09 · shared content for the three Emergence websites (one source, three art directions).
   British English. Sources: src/content/strategy.js and src/apps/siteA.js of the presentation (positioning, purpose,
   lens, the three areas, questions, delivery modes) — the same fundamental content used for Both Sides.
   NOTHING here about Sowmya is invented: no figures, clients, credentials, dates or contact details.
   Articles are SAMPLE TEXT written for the prototype to test long reading; they are not Sowmya's writing.
   Italic (*…*) follows E-15: read alone, it says what becomes clear. */
(function () {
  const it = s => s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  const plain = s => s.replace(/\*/g, '');

  const C = {
    name: 'Murthy Advisory',
    positioning: 'Better leadership decisions through practical judgement, commercial experience and risk thinking.',
    purpose: 'To help leaders exercise better judgement, and act with confidence, when the answer isn’t obvious.',
    purposeBody: 'Most of the questions that reach a Board or an executive team arrive incomplete. The information is partial, the views around the table differ and the clock is running.',
    lens: 'Judgement from both sides of the table.',
    lensBody: 'Many advisers can say they are independent. Few have taken commercial decisions and then overseen them from the risk side.',
    hero: 'When the answer isn’t obvious, *better judgement.*',
    line: 'Out of the noise, *something clear.*',
    sides: [
      { k: 'The business side', t: 'Running businesses, leading commercial portfolios and delivering major transformation.' },
      { k: 'The risk side', t: 'Providing independent challenge as Global CRO and adviser to Boards.' },
      { k: 'Where they meet', t: 'Advice that protects what matters without slowing the organisation down, from someone who has sat in both chairs.' },
    ],
    areas: [
      { id: 'responsible-ai', n: '01', name: 'Responsible AI', tag: 'Governance & responsible adoption',
        problem: 'AI adoption is moving faster than the organisation’s governance, accountability and oversight.',
        outcome: '*Governance that works.*',
        scope: 'Accountability, oversight and the evidence a board needs before it approves, extends or stops the use of AI.',
        questions: ['Is the pilot reversible?', 'Who is accountable when it is wrong?'] },
      { id: 'practical-risk', n: '02', name: 'Practical Risk Thinking', tag: 'Decisions & culture',
        problem: 'Problems are escalated too late, assumptions go unchallenged, and risk appetite is not reflected in everyday decisions.',
        outcome: '*Fewer blind spots.*',
        scope: 'Bringing risk into the decision early, so it shapes the choice instead of reviewing it afterwards.',
        questions: ['What would change our mind?', 'Who has not been heard?'] },
      { id: 'board-advisory', n: '03', name: 'Board & Executive Advisory', tag: 'Judgement & challenge',
        problem: 'Boards and executives need an experienced, independent perspective on complex decisions and competing priorities.',
        outcome: '*Decisions that stick.*',
        scope: 'An independent view on the decisions that matter most, from someone who has taken them and challenged them.',
        questions: ['What do we need to know by when?', 'Is the pilot reversible?'] },
    ],
    questions: ['Is the pilot reversible?', 'Who is accountable when it is wrong?', 'What would change our mind?', 'Who has not been heard?', 'What do we need to know by when?'],
    modes: [
      { n: '01', name: 'Advisory', t: 'Ongoing counsel to a board, a committee or an executive.' },
      { n: '02', name: 'Interim leadership', t: 'Stepping in while a role is filled or a programme is reset.' },
      { n: '03', name: 'Workshops', t: 'Working sessions with a leadership team on one decision or one risk.' },
      { n: '04', name: 'Speaking & education', t: 'Talks and sessions for boards, leaders and their teams.' },
    ],
    modesNote: 'Ways of delivering the three areas of expertise, not additional services.',
    nav: [['about', 'About'], ['expertise', 'Expertise'], ['insights', 'Insights'], ['contact', 'Contact']],
    cta: 'Start a conversation',
    contactLede: 'Write with a short description of the decision in front of you.',
    contactDetails: [['Email', '[ to be confirmed ]'], ['Phone', '[ to be confirmed ]'], ['LinkedIn', '[ to be confirmed ]'], ['Based in', '[ to be confirmed ]']],
    nextSteps: [
      ['Write', 'A few lines on the decision, the timing and who is involved.'],
      ['Talk', 'A first conversation to understand the context.'],
      ['Decide', 'A short note on whether, and how, the work can help.'],
    ],
    status: 'Prototype · draft copy · contact details to be confirmed',
    bioNote: 'Biography to be written with Sowmya. Credentials, experience figures and clients appear only once she has approved them.',
    portrait: { src: '../shared/photos/sowmya-portrait.png', alt: 'Sowmya Murthy, portrait.', credit: 'Photograph: Sowmya Murthy · credit and permission to be confirmed' },
  };

  /* articles · sample text for the prototype (same three titles as Website A, rewritten to the B italic rule) */
  C.articles = [
    {
      slug: 'ai-pilot', area: 'Responsible AI', areaId: 'responsible-ai', read: '6 min read',
      title: 'An AI pilot reaches the board. *Three questions come first.*',
      standfirst: 'An illustrative case. The case for speed is usually clear; the case for oversight is usually late. A short list of questions closes the gap.',
      photo: 's3',
      sections: [
        { k: 'context', h: 'The situation', p: [
          'A proposal to extend AI-assisted triage reached the board with a clear benefit: possible handling-time savings. It reached it with three exposures only partly described: who is accountable, how reliable the output is, and who is affected differently.',
          'None of this is unusual. Proposals are written by the people who want them to happen, and the benefit is the part they understand best. The exposures belong to everyone, which often means they belong to no one.' ] },
        { k: 'evidence', h: 'What the board needs to see', p: [
          'Before approving anything, the board asked what it would need to see. The answer was a short list, not a framework.',
          'The list is short on purpose. Each item has an owner and a date, and each can be checked by someone who did not write the proposal.' ],
          quote: 'Frameworks create structure. *Behaviour determines whether they work.*',
          evidence: [['Baseline handling time', 'pending'], ['Workflow-owner interviews', 'partial'], ['Risk register with owners', 'partial'], ['Human override and escalation path', 'pending'], ['Reversible pilot design', 'verified']] },
        { k: 'conclusion', h: 'The three questions', p: [
          'Is the pilot reversible? If it is not, it is not a pilot. Who is accountable when it is wrong? A name, not a committee. What would change our mind? Agree it before the results arrive, not after.' ],
          rec: 'The pilot can proceed, *under three conditions.*',
          recNote: 'An owner for each exposure, a reversible design, and a date to decide again.' },
      ],
    },
    {
      slug: 'risk-early', area: 'Practical Risk Thinking', areaId: 'practical-risk', read: '5 min read',
      title: 'Bring risk in before the paper is written, *and it shapes the decision.*',
      standfirst: 'Risk that arrives after the decision can only review it. Risk that arrives before can shape it.',
      photo: 'n7',
      sections: [
        { k: 'context', h: 'The situation', p: [
          'In many organisations the risk function sees a decision when it is already made: the business case is written, the sponsor is committed and the timetable is public. At that point challenge feels like obstruction, and it usually is treated that way.',
          'The cost is rarely visible. Problems are escalated late, assumptions go unchallenged, and the stated risk appetite is not the one that shows in everyday choices.' ] },
        { k: 'evidence', h: 'What changes when it is early', p: [
          'When the questions arrive first, they are part of the design. The team asks what would make the plan fail while it can still change the plan.',
          'Early is not the same as more. One conversation at the right moment does more than three reviews at the wrong one.' ],
          quote: 'The question is not whether to take the risk. *It is whether we chose it.*' },
        { k: 'conclusion', h: 'What to do on Monday', p: [
          'Pick the next significant decision on the calendar. Before the paper is written, ask three people outside the sponsoring team what would make it go wrong. Put their answers in the paper.' ],
          rec: 'Not three reviews after the paper: *one conversation before it.*' },
      ],
    },
    {
      slug: 'risk-culture', area: 'Board & Executive Advisory', areaId: 'board-advisory', read: '7 min read',
      title: 'Risk culture is not found in surveys. *It shows up in everyday decisions.*',
      standfirst: 'Culture surveys measure what people say. Decisions show what they do.',
      photo: 'n8',
      sections: [
        { k: 'context', h: 'The situation', p: [
          'Boards are often shown a culture score: a percentage of staff who agree that they can speak up. It is reassuring, and it says little about what happens when someone actually does.',
          'Culture is visible elsewhere: in which issues reach the board, how late they arrive, and what happened to the last person who raised one.' ] },
        { k: 'evidence', h: 'Where to look instead', p: [
          'Look at three recent decisions. Ask when the main risk was first known, by whom, and when it reached the people who could act on it. The gap between those dates is the culture.',
          'Look at what happens to bad news. If it travels slowly, or only in summaries, the score in the survey is describing a different organisation.' ],
          quote: 'What reaches the board, and when, *is the culture.*' },
        { k: 'conclusion', h: 'A better question', p: [
          'Replace “do people feel able to speak up?” with “what did we hear late, and why?”. The second question has an answer you can check.' ],
          rec: 'Not the sentiment: *measure the decisions.*' },
      ],
    },
  ];
  /* reading time from the text actually on the page (≈ 230 words a minute, rounded up, minimum 1) */
  C.articles.forEach(a => {
    const txt = [a.title, a.standfirst, ...a.sections.flatMap(x => [x.h, ...x.p, x.quote || '', x.rec || '', x.recNote || '', ...(x.evidence || []).map(e => e.join(' '))])].join(' ');
    a.words = txt.replace(/\*/g, '').split(/\s+/).filter(Boolean).length;
    a.read = `${Math.max(1, Math.ceil(a.words / 230))} min read`;
  });
  C.article = slug => C.articles.find(a => a.slug === slug);

  C.photos = {
    s3: { src: '../shared/photos/s3.webp', alt: 'Two people check a laptop together in the aisle of a data centre, between rows of servers.', w: 735, h: 483 },
    n7: { src: '../shared/photos/n7.webp', alt: 'Hands working through documents on a table in soft light.', w: 4740, h: 3160 },
    n8: { src: '../shared/photos/n8.webp', alt: 'Two people in conversation at a table beside a large window, a glass between them.', w: 4674, h: 3506 },
    r4: { src: '../shared/photos/r4.webp', alt: 'A doorway frames a discussion in a bright room: people stand and sit around a table.', w: 1920, h: 1440 },
    r2: { src: '../shared/photos/r2.webp', alt: 'Two people lean over the same surface, their shared attention holding the scene.', w: 1080, h: 1350 },
    n6: { src: '../shared/photos/n6.jpg', alt: 'Two people talk at a small table beneath an exposed steel roof, silhouetted against tall windows.', w: 1200, h: 1800 },
    m3: { src: '../shared/photos/m3.webp', alt: 'Rows of dark green upholstered seats in an auditorium, waiting for an audience.', w: 1080, h: 1439 },
    p1: { src: '../shared/photos/p1.webp', alt: 'A face behind ribbed glass, blurred into vertical bands.', w: 1080, h: 1346 },
    n2: { src: '../shared/photos/n2.webp', alt: 'A blurred figure in front of layered city buildings, glass and reflections.', w: 736, h: 917 },
    n4: { src: '../shared/photos/n4.webp', alt: 'A hand and its translucent shadow against a window, in warm directional light.', w: 4764, h: 3181 },
    n3: { src: '../shared/photos/n3.webp', alt: 'A row of columns receding into perspective.', w: 1000, h: 1500 },
  };
  C.photoNote = 'Reference photographs from the shared moodboard: rights unverified, none of them shows Sowmya.';

  window.MC = Object.assign(C, { it, plain });
})();
