import PropTypes from 'prop-types';
import css from './Contacts.module.css';

export const Contacts = ({ contacts, onDeleteContact }) => {
  return (
    <>
      <ul className={css.contactList}>
        {contacts.map(contact => (
          <li key={contact.id} className={css.contactItem}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button
              type="button"
              className={css.deleteBtn}
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
