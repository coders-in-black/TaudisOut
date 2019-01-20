<template>
  <v-ons-page shown>
    <v-ons-list>

      <v-ons-list-header>Déclaration</v-ons-list-header>
      <v-ons-list-item expandable :expanded.sync="expanded.syndic">
        Informer le propriétaire ou le syndic
        <div class="expandable-content">
          selon la gravité, l’information peut être orale ou bien par écrit
          lettre type : <a href="https://drive.google.com/drive/folders/1xb-jAUhfYTzjyXjJ0GQZZuqJuGOLW-i_" target="_blank">Page 38</a>
          <ul>
            <li>Le propriétaire accepte de réaliser les travaux: il doit préciser par écrit (lettre recommandée avec accusé de réception) au locataire quels sont les travaux prévus et leur délai de réalisation.</li>
            <li>Le propriétaire refuse de réaliser les travaux.
              <ul>
                <li> Mise en demeure du propriétaire (lettre recommandée AR):
                  <a href="https://drive.google.com/drive/folders/1xb-jAUhfYTzjyXjJ0GQZZuqJuGOLW-i_">Page 40</a>
                </li>
                <li>
                  Sans réponse de votre propriétaire dans les deux mois, vous pouvez saisir
                  <a href="https://www.adil13.org/ladil-13/fenetre-sur-le-13/commission-departementale-de-conciliation/" target="_blank">la commission de conciliation de votre département
                  </a>, afin de rechercher un accord amiable.
                  Vous pouvez demander en justice (tribunal d’instance) la réalisation des travaux par votre propriétaire.
                  Vous pouvez vous faire représenter dans vos démarches en justice par une association et obtenir, suivant vos ressources, l’aide juridictionnelle pour faire la demande devant le tribunal, vous faire représenter par un avocat et payer les frais de l’expertise judiciaire.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        Dégradation dans l'appartement contacter votre assurance.
      </v-ons-list-item>

      <v-ons-list-header>Assistance Juridique</v-ons-list-header>
      <v-ons-list-item expandable :expanded.sync="expanded.adil">
        Agence Départementale pour l’Information sur le Logement (ADIL)
        <div class="expandable-content">
          Pour obtenir:
          des conseils sur les aspects juridiques, financiers et fiscaux du logement
          les coordonnées de la Commission de Conciliation (CDC) de votre département
          les coordonnées du tribunal d’instance compétent
        </div>
      </v-ons-list-item>
      <v-ons-list-item expandable :expanded.sync="expanded.pole_departemental">
        Faire un signalement auprès du Pôle départemental de lutte contre l'habitat indigne
        <div class="expandable-content">
          <a href="http://www.bouches-du-rhone.gouv.fr/content/download/23899/144674/file/fiche%20signalement%20PDLHI.pdf" target="_blank">
          Formulaire de déclaration
          </a>
          <ul>
            <li>en l’absence de prise en compte du signalement par la commune dans un délai de deux mois : la DDTM relance la commune</li>
            <li>en l’absence de prise en compte du signalement par la commune dans un délai de trois mois : l’ARS prend le relais</li>
          </ul>
        </div>
      </v-ons-list-item>


      <v-ons-list-header>Contacts</v-ons-list-header>
      <v-ons-list-item v-for="(contact, idx) in contacts" :key="idx" expandable :expanded.sync="contact.expanded">
        {{contact.name}}
        <div class="expandable-content">
          <div v-if="contact.url"><v-ons-icon icon="link"></v-ons-icon>
            <a :href="contact.url" target="_blank">{{contact.url}}</a>
          </div>
          <div v-if="contact.address"><v-ons-icon icon="map-pin"></v-ons-icon> {{contact.address}}</div>
          <div v-if="contact.phone"><v-ons-icon icon="phone"></v-ons-icon>
            <a :href="'tel:'+contact.phone">{{contact.phone}}</a>
          </div>
          <div v-if="contact.services && contact.services.length">
            <ul>
              <li v-for="(service, idx2) in contact.services" :key="idx2">{{service}}</li>
            </ul>
          </div>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>

import contacts from '../data/contacts'

export default {
  data() {
    contacts.forEach(contact => contact.expanded = false)
    return {
      contacts,
      expanded: {}
    }
  }
}
</script>
