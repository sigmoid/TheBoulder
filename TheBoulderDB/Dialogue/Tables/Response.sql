CREATE TABLE [Dialogue].[Response] (
    [ID] INT IDENTITY (1, 1) NOT NULL, 
    [PromptID] INT NOT NULL,
    [Text] VARCHAR(MAX) NULL, 
    [NextPromptID] INT
    CONSTRAINT [PK_Response] PRIMARY KEY ([ID]),
    CONSTRAINT [FK_Response_Prompt] FOREIGN KEY (PromptID) REFERENCES [Dialogue].[Prompt] (ID)
);

