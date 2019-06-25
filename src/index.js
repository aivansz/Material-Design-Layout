function setLayoutSettings(artboard, layoutSetting){
  const layout = MSLayoutGrid.alloc().init();
  const width = artboard.frame().width();
  layout.setDrawVertical(1);
  layout.setTotalWidth(width - (2* layoutSetting.gutters));
  layout.setHorizontalOffset(layoutSetting.gutters);
  layout.setNumberOfColumns(layoutSetting.columns);
  layout.setGuttersOutside(false);
  layout.setIsEnabled(true);
  layout.setGutterWidth(layoutSetting.gutters);
  artboard.setLayout(layout); 
}


const mdcGrid = [
  {
    viewportMin: 0,
    viewportMax:599,
    columns: 4,
    gutters: 16
  },
  {
    viewportMin: 600,
    viewportMax: 719,
    columns: 8,
    gutters: 16
  },
  {
    viewportMin: 720,
    viewportMax: 839,
    columns: 8,
    gutters: 24
  },
  {
    viewportMin: 840,
    viewportMax: 99999,
    columns: 12,
    gutters: 24
  }
]

function chooseMDCTemplate(artboardWidth, grid){
  for(var i = 0;grid.length; i++){
    if(artboardWidth >= grid[i].viewportMin && artboardWidth <= grid[i].viewportMax){
      console.log('choosed:::', grid[i]);
      return grid[i];
    }
  }
}


export default function createLayout(context){
  const selection = context.selection
  for(let i = 0; i < selection.length; i++){
    if(selection[i].class() == 'MSArtboardGroup'){
      let layoutSetting = chooseMDCTemplate(selection[i].frame().width(), mdcGrid);
      setLayoutSettings(selection[i], layoutSetting);
      console.log(selection[i])
    }
  }
}