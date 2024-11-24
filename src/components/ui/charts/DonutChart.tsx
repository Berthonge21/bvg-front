import React, { FC, useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';

interface DonutProps {}

const DonutChart: FC<DonutProps> = () => {
  const [series, setSeries] = useState<number[]>([46.5, 23.5, 33.5, 9.5]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const pathRef = useRef<any>(null);
  const chartRef = useRef<any>(null);

  const polarToCartesian = (
    centerX: any,
    centerY: any,
    radius: any,
    angleInDegrees: any,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  const getPiePath = (me: any, startAngle: any, angle: any, size: any) => {
    let path;

    const startDeg = startAngle;
    const startRadians = (Math.PI * (startDeg - 90)) / 180;

    let endDeg = angle + startAngle;
    // prevent overlap
    if (
      Math.ceil(endDeg) >=
      me.fullAngle + (me.w.config.plotOptions.pie.startAngle % me.fullAngle)
    ) {
      endDeg =
        me.fullAngle +
        (me.w.config.plotOptions.pie.startAngle % me.fullAngle) -
        0.01;
    }
    if (Math.ceil(endDeg) > me.fullAngle) endDeg -= me.fullAngle;

    const endRadians = (Math.PI * (endDeg - 90)) / 180;

    const x1 = me.centerX + size * Math.cos(startRadians);
    const y1 = me.centerY + size * Math.sin(startRadians);
    const x2 = me.centerX + size * Math.cos(endRadians);
    const y2 = me.centerY + size * Math.sin(endRadians);

    const startInner = polarToCartesian(
      me.centerX,
      me.centerY,
      me.donutSize,
      endDeg,
    );
    const endInner = polarToCartesian(
      me.centerX,
      me.centerY,
      me.donutSize,
      startDeg,
    );

    const largeArc = angle > 180 ? 1 : 0;

    const pathBeginning = [
      'M',
      x1,
      y1,
      'A',
      size,
      size,
      0,
      largeArc,
      1,
      x2,
      y2,
    ];

    path = [
      ...pathBeginning,
      'L',
      startInner.x,
      startInner.y,
      'A',
      me.donutSize,
      me.donutSize,
      0,
      largeArc,
      0,
      endInner.x,
      endInner.y,
      'L',
      x1,
      y1,
      'z',
    ].join(' ');

    return path;
  };

  useEffect(() => {
    setTimeout(() => {
      const slicesList = Array.from(
        pathRef?.current.querySelectorAll('.apexcharts-slices g'),
      );
      const styleChart =
        pathRef?.current.querySelectorAll('.apexcharts-pie')[0];
      const styleDonut = pathRef?.current;
      styleDonut.style.height = '350px';
      styleDonut.style.padding = '20px 0';
      const svgStyleChart =
        pathRef?.current.querySelectorAll('.apexcharts-svg')[0];
      styleChart.style.transform = 'translate(0,40px)';
      svgStyleChart.style.height = '350px';
      let startAngle = 0;
      slicesList.map((child: any, index) => {
        const path = getPiePath(
          chartRef.current.chart.pie,
          startAngle,
          (series[index] * 360) / series.reduce((a, v) => (a = a + v), 0),
          chartRef.current.chart.pie.sliceSizes[index] + (20 - index * 5),
        );
        child.querySelector('path').setAttribute('style', `d:path("${path}")`);
        startAngle =
          startAngle +
          (series[index] * 360) / series.reduce((a, v) => (a = a + v), 0);
      });
    }, 700);
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    window.addEventListener('resize', updateWindowDimensions);
  }, [windowWidth]);

  const options: any = {
    chart: {
      width: 380,
      type: 'donut',
    },
    colors: ['#00A887', '#D3D552', '#06524C', '#C2C7CA'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          expandOnClick: false,
          labels: {
            show: true,
            value: {
              show: true,
            },
            total: {
              show: true,
              label: 'Total Depense',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter(val: string, opts: any) {
        return 'Achat';
      },
    },
    title: {
      text: 'Mes Dépenses par catégorie',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div ref={pathRef} className="donut">
      <Chart
        ref={chartRef}
        options={options}
        series={series}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default DonutChart;
