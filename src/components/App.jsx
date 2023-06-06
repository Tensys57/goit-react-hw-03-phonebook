import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
const LOCAL_STORAGE_CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const prevContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)
    );
    if (prevContacts) {
      this.setState({
        contacts: prevContacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        LOCAL_STORAGE_CONTACTS_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleFormSubmit = contact => {
    console.log('contact', contact);
    if (this.state.contacts.find(item => item.name === contact.name)) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = ev => {
    this.setState({ filter: ev.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div class="container">
        <h2>Phonebook</h2>
        <ContactForm onSubmitContact={this.handleFormSubmit} />
        <h3>Contacts</h3>
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
