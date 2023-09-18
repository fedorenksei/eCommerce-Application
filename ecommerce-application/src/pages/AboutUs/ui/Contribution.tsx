import clsx from 'clsx';
import { MemberData } from '../data';
import { getTextStyles } from '../../../shared/ui/styles';
import { useState } from 'react';
import { Header3 } from '../../../shared/ui/text/Header3';
import { Header4 } from '../../../shared/ui/text/Header4';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { BsPersonCircle, BsBicycle, BsFillCircleFill } from 'react-icons/bs';

type AggregationType = 'byMember' | 'bySprint';
type ContributionData = {
  label: string;
  items: {
    label: string;
    items: string[];
    comma?: boolean;
  }[];
}[];

export const Contribution = ({
  membersData,
}: {
  membersData: MemberData[];
}) => {
  const [aggregation, setAggregation] = useState<AggregationType>('byMember');

  const dataByMember = membersData.map(({ name, surname, contribution }) => ({
    label: `${name} ${surname}`,
    items: contribution,
  }));

  const dataBySprint = membersData.reduce<ContributionData>((prev, curr) => {
    const fullName = `${curr.name} ${curr.surname}`;
    curr.contribution.forEach(
      ({ label: sprint, items, comma }, indexSprint) => {
        prev[indexSprint] = prev[indexSprint] || { label: sprint, items: [] };
        prev[indexSprint].items.push({ label: fullName, items, comma });
      },
    );
    return prev;
  }, []);

  const data: ContributionData =
    aggregation === 'byMember' ? dataByMember : dataBySprint;

  return (
    <>
      <div className="flex justify-center gap-4">
        <AggregationButton
          typeName="byMember"
          onClick={() => setAggregation('byMember')}
          currenAggregation={aggregation}
        />
        <AggregationButton
          typeName="bySprint"
          onClick={() => setAggregation('bySprint')}
          currenAggregation={aggregation}
        />
      </div>
      <ul className="text-left grid grid-cols-[minmax(0,_400px)] justify-center lg:grid-cols-3 gap-4">
        {data.map(({ label, items }) => (
          <li key={label}>
            <Label
              text={label}
              level="top"
              type={aggregation === 'byMember' ? 'person' : 'sprint'}
            />

            <ul className="pl-4 space-y-2 mt-1">
              {items.map(({ label, items, comma }) => (
                <li key={label}>
                  <Label
                    text={label}
                    level="secondary"
                    type={aggregation === 'bySprint' ? 'person' : 'sprint'}
                  />

                  <ul className="pl-4 space-y-1">
                    {(comma ? [items.join(', ')] : items).map((item) => (
                      <li
                        key={item}
                        className="flex gap-1 items-baseline"
                      >
                        <BsFillCircleFill
                          size="0.4em"
                          className="flex-shrink-0"
                        />
                        <Paragraph>{item}</Paragraph>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

function AggregationButton({
  typeName,
  onClick,
  currenAggregation,
}: {
  typeName: 'byMember' | 'bySprint';
  onClick: () => void;
  currenAggregation: AggregationType;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        getTextStyles({}),
        'p-2 border rounded-md',
        'border-primary-color select-none',
        currenAggregation !== typeName &&
          'cursor-pointer transition hover:border-hover-color hover:bg-hover-color hover:text-white hover:shadow-md',
        currenAggregation === typeName &&
          'cursor-default bg-disabled-color !font-bold',
      )}
    >
      By {typeName === 'byMember' ? 'member' : 'sprint'}
    </button>
  );
}

function Label({
  text,
  level,
  type,
}: {
  text: string;
  level: 'top' | 'secondary';
  type: 'person' | 'sprint';
}) {
  const icon =
    type === 'person' ? (
      <BsPersonCircle
        size="1em"
        className="flex-shrink-0"
      />
    ) : (
      <BsBicycle
        size="1.5em"
        className="flex-shrink-0"
      />
    );
  return level === 'top' ? (
    <div
      className={clsx(getTextStyles({ font: 'h3' }), 'flex gap-1 items-center')}
    >
      {icon}
      <Header3>{text}</Header3>
    </div>
  ) : (
    <div
      className={clsx(getTextStyles({ font: 'h4' }), 'flex gap-1 items-center')}
    >
      {icon}
      <Header4>{text}</Header4>
    </div>
  );
}
