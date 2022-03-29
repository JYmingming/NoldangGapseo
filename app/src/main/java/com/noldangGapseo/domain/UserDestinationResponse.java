package com.noldangGapseo.domain;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDestinationResponse {

    List<Destination> destinationList;
    Destination destination;
    List<NewDestinationComment> newDestinationComments;


    @Override
    public String toString() {
        return "UserDestinationResponse{" +
                "destinations=" + destinationList +
                ", destination=" + destination +
                ", newDestinationComments=" + newDestinationComments +
                '}';
    }

    public List<Destination> getDestinationList() {
        return destinationList;
    }

    public void setDestinationList(List<Destination> destinationList) {
        this.destinationList = destinationList;
    }

    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    public List<NewDestinationComment> getNewDestinationComments() {
        return newDestinationComments;
    }

    public void setNewDestinationComments(List<NewDestinationComment> newDestinationComments) {
        this.newDestinationComments = newDestinationComments;
    }
}
