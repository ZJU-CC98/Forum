import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * CC98Calendar Component
 * 
 * Props:
 * - year: number (defaults to current year)
 * - month: number (1-12, defaults to current month)
 * - renderDateCell: function(momentDate) => ReactNode (optional)
 */
export default function CC98Calendar({ year, month, renderDateCell }) {
  const displayDate = React.useMemo(() => {
    if (year && month) {
      return moment({ year, month: month - 1 });
    }
    return moment();
  }, [year, month]);

  const startOfMonth = displayDate.clone().startOf('month');
  const endOfMonth = displayDate.clone().endOf('month');
  const daysInMonth = displayDate.daysInMonth();

  // Index of weekday for 1st of month (0=Sunday, 6=Saturday)
  const startWeekday = startOfMonth.weekday();

  // Weekday labels (Sunday to Saturday)
  const weekdays = moment.weekdaysShort();

  // Generate array for grid cells: empty slots then days
  const cells = [];
  // Empty placeholders
  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(displayDate.clone().date(day));
  }

  return (
    <div className="cc98-calendar">
      {/* Weekday labels */}
      <div className="cc98-calendar-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', marginBottom: 8 }}>
        {weekdays.map((wd) => (
          <div key={wd}>{wd}</div>
        ))}
      </div>

      {/* Date cells grid */}
      <div className="cc98-calendar-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '1px' }}>
        {cells.map((dateMoment, idx) => (
          <div key={idx}  style={{ padding: '2px', minHeight: '40px' }}>
            {dateMoment
              ? (renderDateCell ? renderDateCell(dateMoment) : dateMoment.date())
              : null
            }
          </div>
        ))}
      </div>
    </div>
  );
}

CC98Calendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  renderDateCell: PropTypes.func,
};

CC98Calendar.defaultProps = {
  year: undefined,
  month: undefined,
  renderDateCell: null,
};
