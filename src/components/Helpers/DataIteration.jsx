function DataIteration(props) {
  const { datas = [], startLength, endLength, children } = props;
  return (
    <>
      {datas &&
        datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value, i) => children({ datas: value, i }))}
    </>
  );
}

export default DataIteration;
