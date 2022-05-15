interface Props {
  points: number;
}

function EnemyScore(props: Props) {
  return <div>【Ｅｎｅｍｙ　ｓｃｏｒｅ】: {props.points}</div>;
}

export default EnemyScore;
