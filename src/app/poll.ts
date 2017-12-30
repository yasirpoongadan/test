export class Poll {
    _id : string;
    pollqtn : string;
    pollans: 
        [{ 
            name:String, 
            voteips : [{
                    ip: String
            }]
        }]
}
