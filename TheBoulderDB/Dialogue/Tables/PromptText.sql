CREATE TABLE [Dialogue].[PromptText] (
    [ID] INT IDENTITY (1, 1) NOT NULL, 
    [Text] VARCHAR(MAX) NULL, 
    [PromptID] INT NULL, 
    [Speaker] VARCHAR(400) NULL, 
    CONSTRAINT [PK_PromptText] PRIMARY KEY ([ID]),
    CONSTRAINT [FK_PromptText_Prompt] FOREIGN KEY (PromptID) REFERENCES [Dialogue].[Prompt] (ID)
);

