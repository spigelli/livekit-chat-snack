use std::time::Duration;
use livekit_api::access_token::{AccessToken, VideoGrants, AccessTokenError};
use livekit_protocol::EgressStatus;
use livekit::prelude::*;
use std::convert::TryFrom;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let room_name = "Default";  // Replace with the actual room name

    let token_result = AccessToken::with_api_key("key", "secret")
        .with_ttl(Duration::from_secs(86400))
        .with_identity("rust-client")
        .with_name("Rust Client")
        .with_grants(VideoGrants {
            room_join: true,
            can_publish: true,
            can_publish_data: true,
            can_publish_sources: vec!["Camera".to_string(), "Microphone".to_string()],
            can_update_own_metadata: true,
            room: room_name.to_string(),
            ..Default::default()
        })
        .to_jwt();

    let token = match token_result {
        Ok(token) => token,
        Err(err) => {
            let error: Box<dyn std::error::Error> = Box::new(err);
            return Err(error);
        }
    };

    let url = "ws://localhost:7880";
    let (room, mut room_events) = Room::connect(url, &token).await.map_err(|err| {
        let error: Box<dyn std::error::Error> = Box::new(err);
        error
    })?;

    println!("Joined room: {:?}", room);
    println!("Logging all events...");
    while let Some(event) = room_events.recv().await {
        // Log all events
        println!("Event: {:?}", event);
    }

    Ok(())
}
