/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  DocumentClient,
  Platform,
  SupportEntry,
} from '../../actions/document-validation/check-compatibility';

export type SupportStatus = DetailedSupportStatus['status'];

export type DetailedSupportStatus =
  | {
      status: 'success';
    }
  | {
      status: 'error';
    }
  | {
      status: 'warning';
      notes: string;
    };

type DocumentClientStats = {
  status: SupportStatus;
  perPlatform: Partial<Record<Platform, DetailedSupportStatus>>;
};

export type CompatibilityStats = {
  status: SupportStatus;
  perDocumentClient: Partial<Record<DocumentClient, DocumentClientStats>>;
};

const noteNumbersRegex = /#(?<noteNumber>\d+)/g;

export const getCompatibilityStatsForEntry = (
  entry: SupportEntry,
  documentClients: DocumentClient[],
) => {
  const stats: CompatibilityStats = {
    status: 'success',
    perDocumentClient: {},
  };
  for (const documentClient of documentClients) {
    const rawStats = entry.stats[documentClient];
    if (rawStats) {
      const documentClientStats: DocumentClientStats = {
        status: 'success',
        perPlatform: {},
      };

      for (const [platform, statusPerVersion] of Object.entries(rawStats)) {
        const latestStatus = statusPerVersion[statusPerVersion.length - 1];
        if (latestStatus === undefined)
          throw new Error(
            'Cannot load in status because there are none recorded for this platform/document client',
            {
              cause: {
                latestStatus,
                statusPerVersion,
                platform,
                documentClient,
                supportEntry: entry,
              },
            },
          );
        const statusString = latestStatus[Object.keys(latestStatus)[0]!]!;
        if (statusString.startsWith('u')) continue;
        if (statusString.startsWith('a')) {
          const notes: string[] = [];
          noteNumbersRegex.lastIndex = 0;
          for (const match of statusString.matchAll(noteNumbersRegex)) {
            if (match.groups?.noteNumber) {
              const { noteNumber } = match.groups;
              const note = entry.notes_by_num?.[Number.parseInt(noteNumber)];
              if (note) {
                notes.push(note);
              }
              // else if (isInternalDev) {
              //   console.warn(
              //     'Could not get note by the number for a support entry',
              //     {
              //       platform,
              //       statusString,
              //       note,
              //     },
              //   );
              // }
            }
          }
          if (documentClientStats.status === 'success')
            documentClientStats.status = 'warning';
          if (stats.status === 'success') stats.status = 'warning';
          documentClientStats.perPlatform[platform as Platform] = {
            status: 'warning',
            notes:
              notes.length === 1
                ? notes[0]!
                : notes.map((note) => `- ${note}`).join('\n'),
          };
        } else if (statusString.startsWith('y')) {
          documentClientStats.perPlatform[platform as Platform] = {
            status: 'success',
          };
        } else if (statusString.startsWith('n')) {
          if (documentClientStats.status !== 'error')
            documentClientStats.status = 'error';
          if (stats.status !== 'error') stats.status = 'error';
          documentClientStats.perPlatform[platform as Platform] = {
            status: 'error',
          };
        }
      }

      stats.perDocumentClient[documentClient] = documentClientStats;
    }
  }

  return stats;
};
