import { BarContainer, Bar } from "./music-visualizer.styles";

const MusicVisualizer = (props) => {
  const { barHeights } = props;
  const colorMult = 0.75;

  const numOfBars = barHeights.length;
  return (
    <BarContainer>
      {barHeights.map((height, index) => {
        let red = height * colorMult;
        let green = 0;
        let blue = height * colorMult;
        let opacity = 1;

        let bottomRGBA =
          "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
        let topRGBA = "rgba(0,0,0,0)";
        let barGradient =
          "linear-gradient(to top," + bottomRGBA + ", " + topRGBA + ")";
        return (
          <Bar
            key={index}
            height={height}
            numOfBars={numOfBars}
            bg={barGradient}
          />
        );
      })}
    </BarContainer>
  );
};

export default MusicVisualizer;
