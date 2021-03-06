import React from "react";
import _ from "lodash";
import styled from "styled-components";

const Wire = styled.span`
  color: #ccc;
`;

const Finger = styled.span`
  color: #333;
  font-weight: bold;
`;

const Open = styled.span`
  color: #333;
  font-weight: bold;
`;

const Fret = styled.span`
  color: #ccc;
  font-weight: bold;
`;

const Name = styled.span`
  color: #ccc;
  font-weight: bold;
`;

export default ({ chord, name }) => {
  let min = _.chain(chord)
    .reject(_.isNull)
    .min()
    .value();
  let max = _.chain(chord)
    .reject(_.isNull)
    .max()
    .value();
  let frets = Math.max(5, max - min);

  return (
    <pre
      style={{
        fontFamily: "Source Code Pro",
        padding: "2em",
        display: "inline-block",
        verticalAlign: "top"
      }}
    >
      {_.chain(new Array(frets))
        .fill()
        .map((_fret, fret) => fret + min)
        .map(fret => {
          return _.flatten([
            fret == min && min != 0 ? (
              <Fret>{_.pad(min, 2)}</Fret>
            ) : (
              <span>&nbsp;&nbsp;</span>
            ),
            _.chain(new Array(6))
              .fill()
              .map((_string, string) => {
                return chord[string] == fret ? (
                  fret == 0 ? (
                    <Open>○</Open>
                  ) : (
                    <Finger>●</Finger>
                  )
                ) : fret == 0 ? (
                  <Wire>┬</Wire>
                ) : (
                  <Wire>│</Wire>
                );
              })
              .concat([
                fret == min && name ? (
                  <span>
                    &nbsp;<Name>{name}</Name>
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )
              ])
              .value()
          ]);
        })
        .map(row => [
          row,
          <span>
            <br />&nbsp;&nbsp;
            <Wire>├┼┼┼┼┤</Wire>
            &nbsp;<br />
          </span>
        ])
        .flatten()
        .value()}
    </pre>
  );
};
