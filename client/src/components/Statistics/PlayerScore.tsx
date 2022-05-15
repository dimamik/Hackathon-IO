interface Props {
  points: number;
}

function PlayerScore(props: Props) {
  return <div>【Ｙｏｕｒ　ｓｃｏｒｅ】: {props.points}</div>;
}

export default PlayerScore;
