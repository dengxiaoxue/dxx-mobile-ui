const install = (App: any) => {
  Object.values(
    import.meta.glob("./components/*/index.ts", { eager: true })
  ).forEach((item: any) => {
    App.component(item.name, item);
  });
};

export default {
  install,
};
