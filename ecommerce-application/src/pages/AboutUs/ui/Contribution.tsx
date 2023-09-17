import clsx from 'clsx';
import { MemberData } from '../data';
import { getTextStyles } from '../../../shared/ui/styles';
import { useState } from 'react';
import { Header3 } from '../../../shared/ui/text/Header3';
import { Header4 } from '../../../shared/ui/text/Header4';
import { Paragraph } from '../../../shared/ui/text/Paragraph';

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
    curr.contribution.forEach(({ label: sprint, items }, indexSprint) => {
      prev[indexSprint] = prev[indexSprint] || { label: sprint, items: [] };
      prev[indexSprint].items.push({ label: fullName, items });
    });
    return prev;
  }, []);

  const data: ContributionData =
    aggregation === 'byMember' ? dataByMember : dataBySprint;

  return (
    <>
      <div className="flex justify-evenly">
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
      <ul className="text-left space-y-4">
        {data.map(({ label, items }) => (
          <li key={label}>
            <Header3>{label}</Header3>
            <ul className="pl-4">
              {items.map(({ label, items, comma }) => (
                <li key={label}>
                  <Header4>{label}</Header4>
                  <ul className="pl-4">
                    {!comma ? (
                      items.map((item) => (
                        <li key={item}>
                          <Paragraph>{item}</Paragraph>
                        </li>
                      ))
                    ) : (
                      <Paragraph>{items.join(', ')}</Paragraph>
                    )}
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
        getTextStyles({ font: 'h5' }),
        'p-2 border rounded-md',
        'border-primary-color select-none',
        'cursor-pointer transition hover:border-hover-color hover:shadow-md',
        currenAggregation === typeName && 'bg-primary-color text-white',
      )}
    >
      By {typeName === 'byMember' ? 'member' : 'sprint'}
    </button>
  );
}
