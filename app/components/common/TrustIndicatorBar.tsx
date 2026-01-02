'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrustBadge {
    name: string;
    icon: string;
    description: string;
}

const TrustIndicatorBar = () => {
    const [expandedBadge, setExpandedBadge] = useState<string | null>(null);

    const trustBadges: TrustBadge[] = [
        {
            name: 'SEC Registered',
            icon: 'ShieldCheckIcon',
            description: 'Registered with the Securities and Exchange Commission'
        },
        {
            name: 'FINRA Member',
            icon: 'BuildingLibraryIcon',
            description: 'Member of Financial Industry Regulatory Authority'
        },
        {
            name: 'Bank-Level Security',
            icon: 'LockClosedIcon',
            description: '256-bit SSL encryption and multi-factor authentication'
        },
        {
            name: 'SIPC Protected',
            icon: 'ShieldExclamationIcon',
            description: 'Securities Investor Protection Corporation coverage'
        }
    ];

    const handleBadgeClick = (badgeName: string) => {
        setExpandedBadge(expandedBadge === badgeName ? null : badgeName);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[50] bg-surface border-t border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center md:justify-between py-3 overflow-x-auto">
                    <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
                        <Icon name="CheckBadgeIcon" size={16} />
                        <span className="font-body font-light text-xs">Trusted by 50,000+ traders</span>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6">
                        {trustBadges.map((badge) => (
                            <div key={badge.name} className="relative group">
                                <button
                                    onClick={() => handleBadgeClick(badge.name)}
                                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-250 hover:bg-muted"
                                    aria-label={badge.name}
                                >
                                    <Icon name={badge.icon as any} size={18} className="text-primary" />
                                    <span className="hidden sm:inline font-body font-normal text-xs text-foreground whitespace-nowrap">
                                        {badge.name}
                                    </span>
                                </button>

                                {expandedBadge === badge.name && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-lg shadow-card p-3 animate-fade-in">
                                        <div className="flex items-start space-x-2">
                                            <Icon name={badge.icon as any} size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-body font-semibold text-sm text-foreground mb-1">
                                                    {badge.name}
                                                </div>
                                                <div className="font-body font-light text-xs text-muted-foreground">
                                                    {badge.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
                        <Icon name="ClockIcon" size={16} />
                        <span className="font-body font-light text-xs">24/7 Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustIndicatorBar;