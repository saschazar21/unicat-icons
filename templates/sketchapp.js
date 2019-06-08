// @ts-nocheck
module.exports = ({ template }, opts, { componentName, jsx }) => {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
    import React from 'react';
    import { Svg, SvgProps } from 'react-sketchapp';
    import Circle from 'react-sketchapp/lib/components/Svg/Circle';
    import ClipPath from 'react-sketchapp/lib/components/Svg/ClipPath';
    import Defs from 'react-sketchapp/lib/components/Svg/Defs';
    import Ellipse from 'react-sketchapp/lib/components/Svg/Ellipse';
    import G from 'react-sketchapp/lib/components/Svg/G';
    import Image from 'react-sketchapp/lib/components/Svg/Image';
    import Line from 'react-sketchapp/lib/components/Svg/Line';
    import LinearGradient from 'react-sketchapp/lib/components/Svg/LinearGradient';
    import Path from 'react-sketchapp/lib/components/Svg/Path';
    import Pattern from 'react-sketchapp/lib/components/Svg/Pattern';
    import Polygon from 'react-sketchapp/lib/components/Svg/Polygon';
    import Polyline from 'react-sketchapp/lib/components/Svg/Polyline';
    import RadialGradient from 'react-sketchapp/lib/components/Svg/RadialGradient';
    import Rect from 'react-sketchapp/lib/components/Svg/Rect';
    import Stop from 'react-sketchapp/lib/components/Svg/Stop';
    import Symbol from 'react-sketchapp/lib/components/Svg/Symbol';
    import Text from 'react-sketchapp/lib/components/Svg/Text';
    import TextPath from 'react-sketchapp/lib/components/Svg/TextPath';
    import TSpan from 'react-sketchapp/lib/components/Svg/TSpan';
    import Use from 'react-sketchapp/lib/components/Svg/Use';
    
    const ${componentName} = (props: SvgProps) => ${jsx};
    export default ${componentName};
  `;
};
