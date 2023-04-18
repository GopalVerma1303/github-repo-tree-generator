import axios from 'axios';
import * as fs from 'fs';

async function createReadmeFromRepo(repoUrl: string): Promise<void> {
    try {
        // Fetch repository contents from GitHub API
        const response = await axios.get(`https://api.github.com/repos/${repoUrl}/contents`);

        // Extract file and directory information from the response
        const contents = response.data;

        // Generate readme content based on file structure
        const readmeContent_LINKS = await generateReadmeContent_LINKS(contents);
        const readmeContent_BASH = '```bash\n' + await generateReadmeContent_BASH(contents, "") + '```';

        // Write readme content to a local README.md file
        fs.writeFileSync('README_LINKS.md', readmeContent_LINKS);
        fs.writeFileSync('README_BASH.md', readmeContent_BASH);

        console.log('README.md files created successfully!');
    } catch (error) {
        console.error('Failed to create README.md files:', error);
    }
}

async function generateReadmeContent_LINKS(contents: any[], depth: number = 0): Promise<string> {
    let readmeContent = '';

    // Loop through each content item
    for (const content of contents) {
        const { type, name, path } = content;
        const indent = '  '.repeat(depth); // Adjust the indentation level as needed

        if (type === 'file') {
            // Add file item to readme content
            readmeContent += `${indent}- [${name}](${path})\n`;
        } else if (type === 'dir') {
            // Add directory item to readme content
            readmeContent += `${indent}- ${name}/\n`;

            // Fetch directory contents and recursively generate readme content for nested contents
            const response = await axios.get(`https://api.github.com/repos/${repoUrl}/contents/${path}`);
            const dirContents = response.data;
            readmeContent += await generateReadmeContent_LINKS(dirContents, depth + 1);
        }
    }

    return readmeContent;
}


async function generateReadmeContent_BASH(contents: any[], prefix: string): Promise<string> {
    let readmeContent = '';
    // Loop through each content item
    for (let i = 0; i < contents.length; i++) {
        const { type, name, path } = contents[i];
        const isLast = i === contents.length - 1;
        const indent = prefix + (isLast ? '└── ' : '├── '); // Adjust the indentation and symbols as needed

        if (type === 'file') {
            // Add file item to readme content
            readmeContent += `${indent}${name}\n`;
        } else if (type === 'dir') {
            // Add directory item to readme content
            readmeContent += `${indent}${name}/\n`;

            // Fetch directory contents and recursively generate readme content for nested contents
            const response = await axios.get(`https://api.github.com/repos/${repoUrl}/contents/${path}`);
            const dirContents = response.data;
            readmeContent += await generateReadmeContent_BASH(dirContents, prefix + (isLast ? '   ' : '│  ')); // Adjust the prefix for nested contents
        }
    }
    return readmeContent;
}

// Example usage
const repoUrl = 'GopalVerma1303/RN-paper-ui'; //try microsoft/vscode :D
createReadmeFromRepo(repoUrl);
