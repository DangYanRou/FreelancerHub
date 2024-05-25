// App.js
import React from 'react';
import { useState } from 'react';
import NavigationBarClient from './NavigationBarClient';
import { Link } from 'react-router-dom';
import '../../styles/Clients/ProposalReceivedPage.css';
import { useHistory } from 'react-router-use-history';

const ProposalReceivedPage = () => {

  const history = useHistory();
  const handleAccept = () => {
    if (window.confirm('Are you sure you want to accept this proposal?')) {
        history.push('/clients/proposal-received');
      }
    };

    const handleReject = () => {
      if (window.confirm('Are you sure you want to reject this proposal?')) {
          history.push('/clients/proposal-received');
          // remove proposal from the list, will do later
      }
    };
  

  const [proposals,setProposal] = useState ([
    { proposal_id: 1, title: 'Application 1', freelancer: 'freelancer 1' },
    { proposal_id: 2, title: 'Application 2', freelancer: 'freelancer 2' },
    { proposal_id: 3, title: 'Application 3', freelancer: 'freelancer 3' },
  ]);

  return (
    <div className="ProposalReview">
      <NavigationBarClient></NavigationBarClient>
      <h1 className='proposalReceivedH1'>Application Received</h1>
      <div className='proposalGrid'>
      {proposals.map((proposal) => (
        <Link key={proposal.proposal_id} to="/clients/proposal-details" className="proposalDetailsLink">
        <div className='proposalPreview'>
          <h2> {proposal.title} </h2>
          <p> submitted by <Link className="freelancerProfileLink" to="/clients/freelancer-temporary-profile">{proposal.freelancer}</Link></p>

        </div>
        </Link>
        
      ))}
      
      </div>
    </div>
  );
};

export default ProposalReceivedPage;