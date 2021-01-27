const transitions = [
  {
    from: undefined,
    to: "index",
    class: "slide-fade",
  },
  {
    from: "index",
    to: "settings",
    class: "slide-fade",
  },
  {
    from: "settings",
    to: "index",
    class: "slide-fade",
  },
  {
    from: "index",
    to: "mailbox",
    class: "fade",
  },
  {
    from: "mailbox",
    to: "index",
    class: "fade",
  },
];

export default transitions;
