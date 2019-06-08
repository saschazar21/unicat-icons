// @ts-nocheck
module.exports = ({ template }, opts, { componentName, jsx }) => {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
    import React from 'react';
    import Svg, {
      Circle,
      ClipPath,
      Defs,
      Ellipse,
      G,
      Image,
      Line,
      LinearGradient,
      Mask,
      Path,
      Pattern,
      Polygon,
      Polyline,
      RadialGradient,
      Rect,
      Stop,
      Symbol,
      SvgProps,
      Text,
      TextPath,
      TSpan,
      Use,
    } from 'react-native-svg';

    const ${componentName} = (props: SvgProps) => ${jsx};
    export default ${componentName};
  `;
};
