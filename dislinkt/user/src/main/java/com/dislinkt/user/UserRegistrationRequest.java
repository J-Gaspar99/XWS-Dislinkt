package com.dislinkt.user;

public record UserRegistrationRequest(
        String firstName,
        String lastName,
        String email)
{

}
