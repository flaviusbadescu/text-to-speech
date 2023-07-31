interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabContent = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="pt-12 mx-auto w-2/3 max-md:w-full max-md:p-8"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};
