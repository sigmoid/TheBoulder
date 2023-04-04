CREATE TABLE [Dialogue].[Prompt] (
    [ID] INT IDENTITY (1, 1) NOT NULL, 
    [ConversationID] INT NOT NULL, 
    CONSTRAINT [PK_Prompt] PRIMARY KEY ([ID]),
    CONSTRAINT [FK_Prompt_Conversation] FOREIGN KEY (ConversationID) REFERENCES [Dialogue].[Conversation] (ID)
);

